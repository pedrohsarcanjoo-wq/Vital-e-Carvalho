import { Home, Key, TrendingUp, FileText, Calculator, Users } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Home,
      title: 'Compra de Imóveis',
      description: 'Encontre o imóvel perfeito com nossa assessoria completa, desde a busca até a assinatura do contrato.',
      features: ['Busca direcionada', 'Visitas acompanhadas', 'Apoio na negociação']
    },
    {
      icon: Key,
      title: 'Venda de Imóveis',
      description: 'Pesquisa de valores da região para apoio na definição do preço de divulgação, com exclusividade na venda.',
      features: ['Análise de mercado', 'Marketing profissional', 'Visitas guiadas']
    },
    {
      icon: TrendingUp,
      title: 'Investimentos',
      description: 'Orientamos sobre as opções: imóvel pronto, na planta ou consórcio (via parceiro especializado).',
      features: ['Análise de perfil', 'Imóveis na planta', 'Consórcios parceiros']
    },
    {
      icon: FileText,
      title: 'Locação',
      description: 'Gestão ágil da locação contemplando a busca do imóvel, visitas, elaboração do contrato e vistoria de entrada.',
      features: ['Contratos seguros', 'Vistoria de entrada', 'Acompanhamento ágil']
    },
    {
      icon: Calculator,
      title: 'Administração de Imóveis',
      description: 'Cuidamos do seu patrimônio com vistorias (entrada e saída) e gestão de inadimplência (cobranças).',
      features: ['Gestão de repasses', 'Vistoria de saída', 'Cobrança ativa']
    },
    {
      icon: Users,
      title: 'Trabalho Avulso / Consultoria',
      description: 'Regularização de imóvel, orientação documental e suporte em processos de compra/venda pontuais.',
      features: ['Regularização', 'Suporte documental', 'Consultoria avulsa']
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00A896] blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#028174] blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,168,150,0.08)] border border-[rgba(0,168,150,0.2)] text-[#028174] px-5 py-2 rounded-full mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse"></div>
            <span className="text-xs font-bold tracking-[0.15em] uppercase">Serviços Exclusivos</span>
          </div>
          
          <h2 className="font-['Poppins'] text-[clamp(36px,4.5vw,52px)] font-bold text-[#1C1C1C] mb-6 leading-[1.15] tracking-tight">
            Soluções Completas Para
            <br />
            <span className="text-[#00A896]">Todas as Suas Necessidades</span>
          </h2>
          
          <p className="text-lg text-[#5A5754] max-w-2xl mx-auto leading-relaxed font-light">
            Do sonho da casa própria aos melhores investimentos, oferecemos expertise e dedicação em cada etapa
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white border-2 border-[#E0E8E7] rounded-2xl p-8 hover:border-[#00A896] hover:shadow-[0_20px_60px_rgba(0,168,150,0.15)] transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A896] to-[#028174] flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <service.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#00A896] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <h3 className="font-['Poppins'] text-xl font-bold text-[#2C2C2C] mb-3 group-hover:text-[#00A896] transition-colors">
                {service.title}
              </h3>
              
              <p className="text-[#5A5754] leading-relaxed mb-5 font-light">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-[#5A5754]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00A896]"></div>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A896] to-[#028174] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
