import { useState, useEffect } from 'react';
import { getPosts, addPost, updatePost, deletePost, BlogPost } from '../../utils/api';
import { Plus, Edit, Trash2, X, Image as ImageIcon, FileText, User, Calendar, AlertCircle } from 'lucide-react';
import { useProperties } from '../../context/PropertyContext';

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const { uploadImage } = useProperties();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openForm = (post?: BlogPost) => {
    setSaveError(null);
    if (post) {
      setEditingPost(post);
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
      setAuthor(post.author || '');
      setExcerpt(post.excerpt || '');
    } else {
      setEditingPost(null);
      setTitle('');
      setContent('');
      setImage('');
      setAuthor('');
      setExcerpt('');
    }
    setImageFile(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setSaving(true);
    setSaveError(null);
    try {
      let finalImageUrl = image;
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      // Add a random string to the slug to avoid unique constraint violations
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + randomSuffix;
      const defaultExcerpt = excerpt.trim() || content.trim().substring(0, 150) + '...';
      const finalAuthor = author.trim() || 'Admin';

      const postData = {
        title: title.trim(),
        content: content.trim(),
        image: finalImageUrl,
        author: finalAuthor,
        excerpt: defaultExcerpt,
        slug
      };

      if (editingPost) {
        // Ignorando erros de tipagem no update caso a API rejeite os novos campos
        await updatePost(editingPost.id, postData as Partial<BlogPost>);
      } else {
        // Ignorando erros de tipagem no add caso a API não tenha essas colunas
        await addPost(postData as unknown as Omit<BlogPost, 'id' | 'createdAt'>);
      }
      
      closeForm();
      fetchPosts();
    } catch (e: any) {
      console.error(e);
      setSaveError(e?.message || 'Erro desconhecido ao salvar post.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (e) {
      console.error(e);
      alert('Erro ao excluir post.');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A896]"></div>
    </div>
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-xl rounded-2xl p-8 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="font-['Poppins'] text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-[#00A896]" size={28} />
            Gerenciar Blog
          </h3>
          <p className="text-gray-500 mt-1 text-sm">Crie e edite as publicações do blog da imobiliária.</p>
        </div>
        <button 
          onClick={() => openForm()}
          className="bg-gradient-to-r from-[#00A896] to-[#028b7d] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
        >
          <Plus size={20} /> Novo Post
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map(post => (
          <div key={post.id} className="group flex flex-col md:flex-row gap-6 p-5 bg-white border border-gray-100 rounded-2xl hover:border-[#00A896]/30 hover:shadow-xl transition-all duration-300">
            <div className="relative overflow-hidden rounded-xl w-full md:w-48 h-48 md:h-32 shrink-0">
              {post.image ? (
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-[#00A896]" /> {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                <span className="flex items-center gap-1.5"><User size={14} className="text-[#00A896]" /> {post.author || 'Admin'}</span>
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#00A896] transition-colors">{post.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt || post.content}</p>
            </div>
            
            <div className="flex items-center gap-2 md:flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
              <button 
                onClick={() => openForm(post)} 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#F0F7F6] text-[#00A896] hover:bg-[#00A896] hover:text-white rounded-xl transition-colors font-medium text-sm"
              >
                <Edit size={16} /> <span className="md:hidden">Editar</span>
              </button>
              <button 
                onClick={() => handleDelete(post.id)} 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors font-medium text-sm"
              >
                <Trash2 size={16} /> <span className="md:hidden">Excluir</span>
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
            <div className="w-16 h-16 bg-[#F0F7F6] rounded-full flex items-center justify-center text-[#00A896] mb-4">
              <FileText size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">Nenhum post encontrado</h4>
            <p className="text-gray-500 max-w-sm">Seu blog ainda está vazio. Comece a compartilhar novidades e dicas criando sua primeira publicação.</p>
            <button 
              onClick={() => openForm()}
              className="mt-6 bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-semibold hover:border-[#00A896] hover:text-[#00A896] transition-all duration-300"
            >
              Criar Primeiro Post
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[9999] flex items-start justify-center p-4 sm:p-6 pt-12 sm:pt-20 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-3xl flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 mb-12">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-gray-50/50 rounded-t-3xl">
              <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
                {editingPost ? <Edit size={22} className="text-[#00A896]" /> : <Plus size={22} className="text-[#00A896]" />}
                {editingPost ? 'Editar Publicação' : 'Nova Publicação'}
              </h3>
              <button 
                onClick={closeForm} 
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 flex-1 space-y-6">
              
              {saveError && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <div className="text-sm font-medium">{saveError}</div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Título da Publicação *</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#00A896] focus:ring-4 focus:ring-[#00A896]/10 rounded-xl outline-none transition-all font-medium text-gray-900"
                    placeholder="Ex: 5 Dicas para Comprar seu Primeiro Imóvel"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Autor</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      value={author} 
                      onChange={e => setAuthor(e.target.value)} 
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#00A896] focus:ring-4 focus:ring-[#00A896]/10 rounded-xl outline-none transition-all text-gray-900"
                      placeholder="Nome do autor"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Imagem de Capa</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 focus:border-[#00A896] rounded-xl outline-none transition-all text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#00A896]/10 file:text-[#00A896] hover:file:bg-[#00A896]/20"
                    />
                  </div>
                </div>
                
                {image && (
                  <div className="md:col-span-2 flex justify-start">
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                      <img src={image} alt="Preview" className="w-full max-w-sm h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Pré-visualização</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Resumo (Opcional)</label>
                  <textarea 
                    value={excerpt} 
                    onChange={e => setExcerpt(e.target.value)} 
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#00A896] focus:ring-4 focus:ring-[#00A896]/10 rounded-xl outline-none transition-all resize-none text-gray-900"
                    placeholder="Breve resumo que aparecerá na listagem de posts..."
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Conteúdo Completo *</label>
                  <textarea 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                    rows={10}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#00A896] focus:ring-4 focus:ring-[#00A896]/10 rounded-xl outline-none transition-all resize-none text-gray-900 leading-relaxed"
                    placeholder="Escreva o conteúdo do seu post aqui..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex gap-4">
                <button 
                  type="button" 
                  onClick={closeForm} 
                  className="flex-1 py-3 px-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={saving} 
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-[#00A896] to-[#028b7d] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#00A896]/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Salvando...</>
                  ) : (
                    'Publicar Post'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

