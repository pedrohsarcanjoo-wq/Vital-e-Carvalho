import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import logoFooter from '../../assets/logo-footer.png';
import logoDev from '../../assets/logo-dev.png';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#1C1C1C] via-[#0A2F2A] to-[#1C1C1C] text-white pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <img src={logoFooter} alt="Vita & Carvalho" className="h-14 w-auto mb-6" />
            <p className="text-[rgba(255,255,255,0.6)] text-sm leading-relaxed mb-6 font-light">
              Excelência em soluções imobiliárias há mais de 15 anos. Transformando sonhos em realidade.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/imobiliariavitaecarvalho"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[#00A896] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/vitaecarvalho"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] hover:bg-[#00A896] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Poppins'] text-[#00A896] text-xs font-bold uppercase tracking-[0.15em] mb-5">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#imoveis" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Imóveis
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Diferenciais
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contato" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Poppins'] text-[#00A896] text-xs font-bold uppercase tracking-[0.15em] mb-5">
              Serviços
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Compra de Imóveis
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Venda de Imóveis
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Locação
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Consultoria Imobiliária
                </a>
              </li>
              <li>
                <a href="#" className="text-[rgba(255,255,255,0.55)] hover:text-[#00A896] text-sm transition-colors font-light">
                  Avaliação de Imóveis
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Poppins'] text-[#00A896] text-xs font-bold uppercase tracking-[0.15em] mb-5">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#00A896] mt-0.5 flex-shrink-0" />
                <span className="text-[rgba(255,255,255,0.55)] text-sm font-light">Rua dos Cedros 404 - Polvilho Portal dos Ipes.<br /></span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#00A896] flex-shrink-0" />
                <span className="text-[rgba(255,255,255,0.55)] text-sm font-light">+55 (11) 94128-6418</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#00A896] flex-shrink-0" />
                <span className="text-[rgba(255,255,255,0.55)] text-sm font-light">adm@vitaecarvalho.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[rgba(255,255,255,0.35)] text-center md:text-left font-light">
            © {new Date().getFullYear()} Vita & Carvalho Imóveis. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm text-[rgba(255,255,255,0.35)]">
            <a href="#" className="hover:text-[#00A896] transition-colors font-light">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-[#00A896] transition-colors font-light">
              Termos de Uso
            </a>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-center gap-2">
          <span className="text-xs text-[rgba(255,255,255,0.3)] font-light">Desenvolvido por</span>
          <a href="https://www.instagram.com/axiagrowth_/" target="_blank" rel="noopener noreferrer">
            <img src={logoDev} alt="Developer Logo" className="h-[20px] w-auto opacity-50 hover:opacity-100 transition-opacity mix-blend-screen hover:scale-105" />
          </a>
        </div>
      </div>
    </footer>
  );
}