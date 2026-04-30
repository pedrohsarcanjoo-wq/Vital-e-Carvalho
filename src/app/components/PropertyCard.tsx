import { MapPin, Bed, Square, Car } from 'lucide-react';
import { Link } from 'react-router';

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  priceDetail?: string;
  location: string;
  bedrooms: number;
  area: number;
  parking: number;
  image: string;
  badge?: string;
  code?: string;
  code2?: string;
}

export function PropertyCard({
  id,
  title,
  price,
  priceDetail,
  location,
  bedrooms,
  area,
  parking,
  image,
  badge,
  code,
  code2,
}: PropertyCardProps) {
  return (
    <Link to={`/imovel/${id}`} className="block h-full">
      <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl overflow-hidden hover:shadow-[0_20px_60px_rgba(0,168,150,0.15)] hover:-translate-y-2 hover:border-[#00A896] transition-all duration-500 group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 overflow-hidden flex-shrink-0">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {badge && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-[#00A896] to-[#028174] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg">
              {badge}
            </div>
          )}
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Content */}
        <div className="p-7 flex-1 flex flex-col">
          {/* Price */}
          <div className="mb-3 flex justify-between items-start">
            <div>
              <div className="font-['Poppins'] text-3xl font-bold text-[#1C1C1C] group-hover:text-[#00A896] transition-colors">
                {price}
              </div>
              {priceDetail && (
                <div className="text-sm text-[#9A9690] font-light">{priceDetail}</div>
              )}
            </div>
            {(code || code2) && (
              <div className="text-xs font-semibold text-[#00A896] bg-[rgba(0,168,150,0.1)] px-2 py-1 rounded-md text-right">
                {code && <div>REF: {code}</div>}
                {code2 && <div>REF 2: {code2}</div>}
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-['Poppins'] font-semibold text-lg text-[#2C2C2C] mb-2 line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-[#9A9690] mb-5">
            <MapPin size={16} className="text-[#00A896] flex-shrink-0" />
            <span className="font-light line-clamp-1">{location}</span>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-6 pt-5 border-t-2 border-[#E0E8E7] text-sm text-[#5A5754] mt-auto">
            <div className="flex items-center gap-2">
              <Bed size={18} className="text-[#00A896]" strokeWidth={2} />
              <span className="font-semibold">{bedrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <Square size={18} className="text-[#00A896]" strokeWidth={2} />
              <span className="font-semibold">{area}m²</span>
            </div>
            <div className="flex items-center gap-2">
              <Car size={18} className="text-[#00A896]" strokeWidth={2} />
              <span className="font-semibold">{parking}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}