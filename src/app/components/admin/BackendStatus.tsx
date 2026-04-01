import { useState, useEffect } from 'react';
import { Activity, Database, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { checkBackendHealth } from '../../utils/api';

interface HealthData {
  status: string;
  version: string;
  timestamp: number;
  cache: {
    hasData: boolean;
    itemCount: number;
    age: number;
  };
}

export function BackendStatus() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await checkBackendHealth();
      setHealth(data);
      setLastCheck(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check health');
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const cacheAge = health?.cache.age ? (health.cache.age / 1000).toFixed(1) : '0';
  const cacheFresh = health?.cache.age ? health.cache.age < 30000 : false;
  const isHealthy = health?.status === 'ok';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#00A896]" />
          <h3 className="text-lg font-semibold">Status do Backend</h3>
        </div>
        
        <button
          onClick={checkHealth}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex items-center gap-2 text-red-700">
            <XCircle className="w-5 h-5" />
            <span className="font-medium">Erro ao conectar</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{error}</p>
        </div>
      )}

      {health && (
        <div className="space-y-4">
          {/* Status Geral */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            {isHealthy ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <div className="flex-1">
              <div className="font-medium">
                {isHealthy ? 'Servidor Online' : 'Servidor com Problemas'}
              </div>
              <div className="text-sm text-gray-600">
                Versão {health.version}
              </div>
            </div>
          </div>

          {/* Cache */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
            <Database className="w-5 h-5 text-[#00A896]" />
            <div className="flex-1">
              <div className="font-medium">Cache de Propriedades</div>
              <div className="text-sm text-gray-600">
                {health.cache.hasData ? (
                  <>
                    {health.cache.itemCount} {health.cache.itemCount === 1 ? 'propriedade' : 'propriedades'} em cache
                  </>
                ) : (
                  'Nenhum dado em cache'
                )}
              </div>
            </div>
            {health.cache.hasData && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  cacheFresh
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {cacheFresh ? 'Válido' : 'Expirado'}
              </span>
            )}
          </div>

          {/* Idade do Cache */}
          {health.cache.hasData && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md">
              <Clock className="w-5 h-5 text-gray-500" />
              <div className="flex-1">
                <div className="font-medium">Idade do Cache</div>
                <div className="text-sm text-gray-600">
                  {cacheAge}s (TTL: 30s)
                </div>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    cacheFresh ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{
                    width: `${Math.min((health.cache.age / 30000) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Última Verificação */}
          {lastCheck && (
            <div className="text-xs text-gray-500 text-center pt-2 border-t">
              Última verificação: {lastCheck.toLocaleTimeString('pt-BR')}
            </div>
          )}
        </div>
      )}

      {!health && !error && !loading && (
        <div className="text-center text-gray-500 py-8">
          Clique em "Atualizar" para verificar o status do servidor
        </div>
      )}
    </div>
  );
}
