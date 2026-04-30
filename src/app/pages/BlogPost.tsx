import { useState, useEffect } from 'react';
import { getPost, BlogPost as BlogPostType } from '../utils/api';
import { useParams, Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getPost(id).then(data => {
        setPost(data);
        setLoading(false);
      }).catch(err => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#00A896] font-semibold mb-8 hover:underline">
            <ArrowLeft size={18} /> Voltar para o Blog
          </Link>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00A896] border-t-transparent"></div>
            </div>
          ) : !post ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-[#1C1C1C]">Artigo não encontrado</h2>
            </div>
          ) : (
            <article>
              <div className="flex items-center gap-2 text-sm text-[#9A9690] mb-4">
                <Calendar size={16} />
                {new Date(post.createdAt).toLocaleDateString('pt-BR')}
              </div>
              <h1 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-[#1C1C1C] mb-8 leading-tight">
                {post.title}
              </h1>
              
              {post.image && (
                <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
                  <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
                </div>
              )}

              <div className="prose prose-lg max-w-none text-[#5A5754] font-light leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
