import { useState, useEffect } from 'react';
import { getPosts, BlogPost } from '../utils/api';
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowRight, Calendar } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(data => {
      setPosts(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setLoading(false);
    }).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F0F7F6] to-white">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16 text-center">
            <h1 className="font-['Poppins'] text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-4">Blog</h1>
            <p className="text-[#5A5754] text-lg max-w-2xl mx-auto">Notícias, dicas e novidades sobre o mercado imobiliário e muito mais.</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00A896] border-t-transparent"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-[#9A9690] text-lg">
              Ainda não há artigos publicados.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link to={`/blog/${post.id}`} key={post.id} className="group bg-white rounded-2xl border-2 border-[#E0E8E7] overflow-hidden hover:border-[#00A896] hover:shadow-xl transition-all duration-300 flex flex-col">
                  {post.image ? (
                    <div className="h-56 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-56 bg-gradient-to-br from-[#F0F7F6] to-[#E0E8E7]"></div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm text-[#9A9690] mb-3">
                      <Calendar size={14} />
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <h2 className="font-['Poppins'] text-xl font-bold text-[#1C1C1C] mb-3 group-hover:text-[#00A896] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-[#5A5754] line-clamp-3 mb-6 flex-1">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-2 text-[#00A896] font-semibold text-sm">
                      Ler Artigo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
