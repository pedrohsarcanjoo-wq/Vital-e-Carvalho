import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import logo from '../../assets/logo-navbar.png';
export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b-2 border-[#E0E8E7] shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
           <div className="flex items-center">
            <img src={logo} alt="Vita & Carvalho" className="h-20 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#imoveis" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors px-4 py-2">
              Imóveis
            </a>
            <a href="#sobre" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors px-4 py-2">
              Sobre Nós
            </a>
            <a href="#diferenciais" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors px-4 py-2">
              Diferenciais
            </a>
            <a href="#depoimentos" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors px-4 py-2">
              Depoimentos
            </a>
            <a href="/blog" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors px-4 py-2">
              Blog
            </a>
            <a 
              href="https://api.whatsapp.com/send/?phone=5511941286418&text&type=phone_number&app_absent=0&utm_source=ig"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-6 py-3 rounded-lg font-semibold text-sm tracking-wide hover:shadow-[0_8px_28px_rgba(0,168,150,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone className="inline-block w-4 h-4 mr-2" />
              Falar com Corretor
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#5A5754] hover:text-[#00A896] transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-[#E0E8E7]">
            <div className="flex flex-col gap-3">
              <a href="#imoveis" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors py-2">
                Imóveis
              </a>
              <a href="#sobre" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors py-2">
                Sobre Nós
              </a>
              <a href="#diferenciais" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors py-2">
                Diferenciais
              </a>
              <a href="#depoimentos" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors py-2">
                Depoimentos
              </a>
              <a href="/blog" className="text-sm font-semibold text-[#5A5754] hover:text-[#00A896] transition-colors py-2">
                Blog
              </a>
              <a href="https://api.whatsapp.com/send/?phone=5511941286418&text&type=phone_number&app_absent=0&utm_source=ig"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-[#00A896] to-[#028174] text-white px-6 py-3 rounded-lg font-semibold text-sm tracking-wide text-center mt-2"
              >
                <Phone className="inline-block w-4 h-4 mr-2" />
                Falar com Corretor
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}