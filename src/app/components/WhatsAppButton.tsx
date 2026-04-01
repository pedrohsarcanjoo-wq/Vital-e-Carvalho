import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const whatsappUrl = 'https://wa.me/5511942113331?text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informações.';

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_48px_rgba(37,211,102,0.6)] flex items-center justify-center hover:scale-110 transition-all duration-300 group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} className="group-hover:scale-110 transition-transform" strokeWidth={2} />
      
      {/* Pulse Animation */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
    </a>
  );
}