export function Stats() {
  const stats = [
    { number: '2.400+', label: 'Imóveis Cadastrados' },
    { number: '5.200+', label: 'Clientes Satisfeitos' },
    { number: '15', label: 'Anos de Experiência' },
    { number: '12', label: 'Cidades Atendidas' },
  ];

  return (
    <section id="sobre" className="py-24 bg-gradient-to-br from-[#1C1C1C] via-[#0A2F2A] to-[#1C1C1C] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#00A896] blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#028174] blur-[120px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group cursor-default">
              <div className="font-['Poppins'] text-[clamp(48px,6vw,64px)] font-extrabold leading-none mb-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#00A896] to-[#05C4B4] group-hover:from-[#05C4B4] group-hover:to-[#00A896] transition-all duration-500">
                  {stat.number}
                </span>
              </div>
              <div className="text-sm text-[rgba(255,255,255,0.6)] font-medium uppercase tracking-[0.15em] group-hover:text-[rgba(255,255,255,0.9)] transition-colors">
                {stat.label}
              </div>
              {/* Animated Bar */}
              <div className="w-16 h-1 bg-gradient-to-r from-[#00A896] to-transparent mx-auto mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}