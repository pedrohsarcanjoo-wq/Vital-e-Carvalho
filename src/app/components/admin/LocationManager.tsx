import { useState, useEffect } from 'react';
import { getLocations, addLocation, deleteLocation, LocationCategory } from '../../utils/api';
import { Trash2, Plus } from 'lucide-react';

export function LocationManager() {
  const [locations, setLocations] = useState<LocationCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [type, setType] = useState<'city' | 'neighborhood'>('city');

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const data = await getLocations();
      setLocations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addLocation({ name: name.trim(), type });
      setName('');
      fetchLocations();
    } catch (e) {
      console.error(e);
      alert('Erro ao adicionar.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Excluir este local?')) return;
    try {
      await deleteLocation(id);
      fetchLocations();
    } catch (e) {
      console.error(e);
      alert('Erro ao excluir.');
    }
  };

  const cities = locations.filter(l => l.type === 'city');
  const neighborhoods = locations.filter(l => l.type === 'neighborhood');

  return (
    <div className="bg-white border-2 border-[#E0E8E7] rounded-2xl p-6">
      <h3 className="font-['Poppins'] text-xl font-bold text-[#1C1C1C] mb-6">Gerenciar Cidades e Bairros</h3>
      
      <form onSubmit={handleAdd} className="flex gap-4 mb-8">
        <select value={type} onChange={e => setType(e.target.value as any)} className="h-10 px-3 border-2 border-[#E0E8E7] rounded-lg">
          <option value="city">Cidade</option>
          <option value="neighborhood">Bairro</option>
        </select>
        <input 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Nome da Cidade/Bairro" 
          className="flex-1 h-10 px-3 border-2 border-[#E0E8E7] rounded-lg"
          required
        />
        <button type="submit" className="h-10 bg-[#00A896] text-white px-6 rounded-lg font-semibold flex items-center gap-2">
          <Plus size={18} /> Adicionar
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold text-[#2C2C2C] mb-4">Cidades Cadastradas</h4>
          <div className="space-y-2">
            {cities.map(c => (
              <div key={c.id} className="flex justify-between items-center bg-[#F0F7F6] p-3 rounded-lg">
                <span className="font-medium text-[#1C1C1C]">{c.name}</span>
                <button onClick={() => handleDelete(c.id)} className="text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
            {cities.length === 0 && <p className="text-sm text-[#9A9690]">Nenhuma cidade cadastrada.</p>}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-[#2C2C2C] mb-4">Bairros Cadastrados</h4>
          <div className="space-y-2">
            {neighborhoods.map(n => (
              <div key={n.id} className="flex justify-between items-center bg-[#F0F7F6] p-3 rounded-lg">
                <span className="font-medium text-[#1C1C1C]">{n.name}</span>
                <button onClick={() => handleDelete(n.id)} className="text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
            {neighborhoods.length === 0 && <p className="text-sm text-[#9A9690]">Nenhum bairro cadastrado.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
