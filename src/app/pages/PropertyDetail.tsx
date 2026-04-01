import { useParams, Link, useNavigate } from 'react-router';
import { useProperties } from '../context/PropertyContext';
import { ArrowLeft, MapPin, Bed, Bath, Square, Car, Share2, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, loading } = useProperties();
  const property = properties.find(p => p.id === id) || properties.find(p => p.code === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00A896] border-t-transparent"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F0F7F6] to-white">
        <div className="text-center">
          <h2 className="font-['Poppins'] text-3xl font-bold text-[#2C2C2C] mb-4">
            Imóvel não encontrado
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#00A896] hover:underline font-semibold"
          >
            <ArrowLeft size={20} />
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Olá! Tenho interesse no imóvel: ${property.title} - ${property.location}. Gostaria de mais informações.`;
  const whatsappUrl = `https://wa.me/5511942113331?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b-2 border-[#E0E8E7] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#5A5754] hover:text-[#00A896] transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            Voltar
          </button>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border-2 border-[#E0E8E7] flex items-center justify-center hover:border-[#00A896] hover:text-[#00A896] transition-all">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-[#E0E8E7] flex items-center justify-center hover:border-[#00A896] hover:text-[#00A896] transition-all">
              <Heart size={18} />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 hover:shadow-[0_8px_28px_rgba(0,168,150,0.3)] transition-all"
            >
              <MessageCircle size={18} />
              Falar com Corretor
            </a>
          </div>
        </div>
      </header>

      <div className="pt-20">
        {/* Gallery Section */}
        <section className="bg-black">
          <div className="max-w-[1600px] mx-auto">
            {/* Main Image */}
            <div className="relative h-[600px] overflow-hidden">
              <img
                src={property.gallery[selectedImage] || property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.badge && (
                <div className="absolute top-8 left-8 bg-gradient-to-r from-[#00A896] to-[#028174] text-white px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase shadow-xl">
                  {property.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="bg-[#1C1C1C] p-6">
              <div className="flex gap-4 overflow-x-auto">
                {(Array.isArray(property.gallery) ? property.gallery : property.gallery ? [property.gallery] : []).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden border-4 transition-all ${
                      selectedImage === idx
                        ? 'border-[#00A896] scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img as string} alt={`${property.title} - ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-[#00A896] uppercase tracking-wider px-4 py-1.5 bg-[rgba(0,168,150,0.1)] rounded-full">
                      {property.status}
                    </span>
                    <span className="text-sm font-semibold text-[#5A5754]">{property.type}</span>
                  </div>
                  
                  <h1 className="font-['Poppins'] text-[clamp(32px,4vw,48px)] font-bold text-[#1C1C1C] mb-4 leading-tight">
                    {property.title}
                  </h1>
                  
                  <div className="flex items-center gap-2 text-[#5A5754] mb-6">
                    <MapPin size={20} className="text-[#00A896]" />
                    <span className="text-lg font-light">{property.location}</span>
                  </div>

                  <div className="font-['Poppins'] text-5xl font-bold text-[#00A896] mb-2">
                    {property.price}
                  </div>
                  {property.priceDetail && (
                    <div className="text-[#9A9690] font-light">{property.priceDetail}</div>
                  )}
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-[#F0F7F6] to-white border-2 border-[#E0E8E7] rounded-2xl p-6 text-center">
                    <Bed className="w-8 h-8 text-[#00A896] mx-auto mb-3" strokeWidth={2} />
                    <div className="text-3xl font-bold text-[#1C1C1C] mb-1">{property.bedrooms}</div>
                    <div className="text-sm text-[#9A9690] font-medium">Quartos</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#F0F7F6] to-white border-2 border-[#E0E8E7] rounded-2xl p-6 text-center">
                    <Bath className="w-8 h-8 text-[#00A896] mx-auto mb-3" strokeWidth={2} />
                    <div className="text-3xl font-bold text-[#1C1C1C] mb-1">{property.bathrooms}</div>
                    <div className="text-sm text-[#9A9690] font-medium">Banheiros</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#F0F7F6] to-white border-2 border-[#E0E8E7] rounded-2xl p-6 text-center">
                    <Square className="w-8 h-8 text-[#00A896] mx-auto mb-3" strokeWidth={2} />
                    <div className="text-3xl font-bold text-[#1C1C1C] mb-1">{property.area}</div>
                    <div className="text-sm text-[#9A9690] font-medium">m²</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#F0F7F6] to-white border-2 border-[#E0E8E7] rounded-2xl p-6 text-center">
                    <Car className="w-8 h-8 text-[#00A896] mx-auto mb-3" strokeWidth={2} />
                    <div className="text-3xl font-bold text-[#1C1C1C] mb-1">{property.parking}</div>
                    <div className="text-sm text-[#9A9690] font-medium">Vagas</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="font-['Poppins'] text-2xl font-bold text-[#2C2C2C] mb-4">
                    Sobre o Imóvel
                  </h2>
                  <p className="text-[#5A5754] leading-relaxed text-lg font-light">
                    {property.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h2 className="font-['Poppins'] text-2xl font-bold text-[#2C2C2C] mb-6">
                    Características
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(Array.isArray(property.features) ? property.features : property.features ? [property.features] : []).map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-gradient-to-br from-[#F0F7F6] to-white border-2 border-[#E0E8E7] rounded-xl p-4 hover:border-[#00A896] transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#00A896]"></div>
                        <span className="text-[#2C2C2C] font-medium">{feature as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  {/* Contact Card */}
                  <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
                    <h3 className="font-['Poppins'] text-2xl font-bold text-[#2C2C2C] mb-6">
                      Interessado?
                    </h3>
                    
                    <p className="text-[#5A5754] mb-6 font-light leading-relaxed">
                      Entre em contato com nossa equipe e agende uma visita para conhecer este imóvel incrível.
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-6 py-4 rounded-xl font-bold text-sm tracking-wide hover:shadow-[0_12px_40px_rgba(0,168,150,0.35)] transition-all flex items-center justify-center gap-3 mb-4"
                    >
                      <MessageCircle size={20} />
                      Falar no WhatsApp
                    </a>

                    <a
                      href="tel:+5511942113331"
                      className="w-full border-2 border-[#00A896] text-[#00A896] px-6 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-[#00A896] hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                      Ligar Agora
                    </a>

                    <div className="mt-8 pt-8 border-t-2 border-[#E0E8E7] space-y-3 text-sm text-[#5A5754]">
                      <p className="font-light">
                        <strong className="font-semibold text-[#2C2C2C]">Código:</strong> #{property.id}
                      </p>
                      <p className="font-light">
                        <strong className="font-semibold text-[#2C2C2C]">Publicado:</strong>{' '}
                        {new Date(property.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}