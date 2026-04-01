import { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { API_URL, getAuthToken, uploadImage as apiUploadImage } from '../utils/api';

export interface Property {
  id: string;
  code?: string;
  title: string;
  price: string;
  priceDetail?: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
  gallery: string[];
  type: string;
  status: 'Venda' | 'Locação';
  createdAt: string;
}

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  loading: boolean;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Load properties once on mount
  useEffect(() => {
    let mounted = true;

    const loadProperties = async () => {
      try {
        console.log('🔄 [PropertyContext] Carregando propriedades...');
        
        const response = await fetch(`${API_URL}/properties`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        });

        if (!mounted) return;

        if (response.ok) {
          const data = await response.json();
          setProperties(data.properties || []);
          console.log(`✅ [PropertyContext] ${data.properties?.length || 0} propriedades carregadas`);
        } else {
          console.error('❌ [PropertyContext] Erro ao carregar propriedades:', response.status);
        }
      } catch (error) {
        console.error('❌ [PropertyContext] Exceção ao carregar:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProperties();

    return () => {
      mounted = false;
    };
  }, []);

  const addProperty = useCallback(async (property: Omit<Property, 'id' | 'createdAt'>) => {
    console.log('➕ [PropertyContext] Adicionando propriedade...');
    console.log('📦 [PropertyContext] Dados:', property.title);
    
    const token = getAuthToken();
    
    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(property),
    });

    console.log('📡 [PropertyContext] Status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ [PropertyContext] Erro:', errorData);
      throw new Error(errorData.error || errorData.details || 'Failed to add property');
    }

    const data = await response.json();
    
    if (data.success && data.property) {
      setProperties((prev) => [data.property, ...prev]);
      console.log('✅ [PropertyContext] Propriedade adicionada:', data.property.id);
    } else {
      throw new Error('Invalid response from server');
    }
  }, []);

  const updateProperty = useCallback(async (id: string, updatedData: Partial<Property>) => {
    const token = getAuthToken();
    
    console.log('✏️ [PropertyContext] Atualizando propriedade:', id);
    
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ [PropertyContext] Erro ao atualizar:', error);
      throw new Error(error.error || 'Failed to update');
    }

    const data = await response.json();
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? data.property : prop))
    );
    console.log('✅ [PropertyContext] Propriedade atualizada:', id);
  }, []);

  const deleteProperty = useCallback(async (id: string) => {
    const token = getAuthToken();
    
    console.log('🗑️ [PropertyContext] Deletando propriedade:', id);
    
    const response = await fetch(`${API_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ [PropertyContext] Erro ao deletar:', error);
      throw new Error(error.error || 'Failed to delete');
    }

    setProperties((prev) => prev.filter((prop) => prop.id !== id));
    console.log('✅ [PropertyContext] Propriedade deletada:', id);
  }, []);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    console.log('📤 [PropertyContext] Fazendo upload de imagem:', file.name);
    
    try {
      const url = await apiUploadImage(file);
      console.log('✅ [PropertyContext] Upload concluído');
      return url;
    } catch (error) {
      console.error('❌ [PropertyContext] Erro no upload:', error);
      throw error;
    }
  }, []);

  const value = useMemo(() => ({
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    uploadImage,
    loading,
  }), [properties, addProperty, updateProperty, deleteProperty, uploadImage, loading]);

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within PropertyProvider');
  }
  return context;
}