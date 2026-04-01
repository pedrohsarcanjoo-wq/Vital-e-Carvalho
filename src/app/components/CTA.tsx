import { Phone, MessageCircle } from 'lucide-react';

export function CTA() {
  return (
    <section id="contato" className="py-32 bg-gradient-to-br from-[#1C1C1C] via-[#0A2F2A] to-[#1C1C1C] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] rounded-full bg-[#00A896] blur-[150px]"></div>
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] rounded-full bg-[#05C4B4] blur-[180px]"></div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#00A896 1px, transparent 1px), linear-gradient(90deg, #00A896 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }}></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.15)] border border-[rgba(0,168,150,0.3)] text-[#05C4B4] px-5 py-2 rounded-full mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Fale Conosco</span>
          </div>

          {/* Headline */}
          <h2 className="font-['Poppins'] text-[clamp(36px,5vw,56px)] font-bold text-white mb-6 leading-tight tracking-tight">
            Pronto Para Encontrar Seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A896] to-[#05C4B4]">
              Imóvel Ideal?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-[rgba(255,255,255,0.7)] mb-12 leading-relaxed font-light">
            Nossa equipe está pronta para ajudá-lo a realizar o sonho do imóvel perfeito. Entre em contato agora mesmo e agende uma visita.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-12">
            <a
              href="https://api.whatsapp.com/send/?phone=5511941286418&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-10 py-5 rounded-xl font-semibold text-sm tracking-wide hover:shadow-[0_12px_48px_rgba(0,168,150,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              <MessageCircle size={22} strokeWidth={2} />
              WhatsApp
            </a>
            <a
              href="tel:+5511941286418"
              className="inline-flex items-center justify-center gap-3 border-2 border-[#00A896] text-[#00A896] bg-transparent px-10 py-5 rounded-xl font-semibold text-sm tracking-wide hover:bg-[#00A896] hover:text-white transition-all duration-300"
            >
              <Phone size={22} strokeWidth={2} />
              (11) 94128-6418
            </a>
          </div>

          {/* Additional Info */}
          <div className="pt-10 border-t border-[rgba(255,255,255,0.1)]">
            <p className="text-sm text-[rgba(255,255,255,0.5)] font-light">
              Atendimento de segunda a sexta, das 9h às 18h | Sábados das 9h às 13h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}