import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.ts";

const app = new Hono();

// ==================== CONFIGURATION ====================
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = 'make-9a04a9a2-property-images';
const PROPERTY_PREFIX = 'property:';
const CACHE_TTL_MS = 30000; // 30 segundos
const DB_TIMEOUT_MS = 30000; // 30 segundos de timeout

// ==================== STATE (CACHE) ====================
let cache = {
  properties: [] as any[],
  timestamp: 0,
};

// ==================== MIDDLEWARE ====================
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// ==================== STORAGE INITIALIZATION ====================
async function initializeStorage() {
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      console.log('📦 [Storage] Criando bucket:', BUCKET_NAME);
      await supabaseAdmin.storage.createBucket(BUCKET_NAME, { public: false });
      console.log('✅ [Storage] Bucket criado');
    } else {
      console.log('✅ [Storage] Bucket já existe');
    }
  } catch (error) {
    console.error('❌ [Storage] Erro ao inicializar:', error.message);
  }
}

initializeStorage();

// ==================== HELPER FUNCTIONS ====================

/**
 * Timeout Wrapper: Previne que o DB trave processamento aguardando
 */
async function withTimeout<T>(promise: Promise<T>, ms: number = DB_TIMEOUT_MS): Promise<T> {
  let timeoutId: number | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });
  
  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}

/**
 * Resgata propriedades individuais salvadas pelo prefixo
 * Resolvendo as Race Conditions da versão anterior
 */
async function fetchFromDB(): Promise<any[]> {
  const data = await kv.getByPrefix(PROPERTY_PREFIX);
  // Ordena das mais novas para as mais velhas
  return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Carrega propriedades utilizando mecanismo potente de In-Memory Cache e Timeout fallback.
 */
async function loadProperties(forceRefresh = false): Promise<any[]> {
  const now = Date.now();
  if (!forceRefresh && cache.timestamp > 0 && (now - cache.timestamp) < CACHE_TTL_MS) {
    console.log('⚡ [Cache] Retornando propriedades salvadas em cache');
    return cache.properties;
  }
  
  try {
    const data = await withTimeout(fetchFromDB());
    cache.properties = data;
    cache.timestamp = now;
    console.log(`📡 [DB] ${data.length} propriedades carregadas de chaves individuais do KV Store`);
    return data;
  } catch (error) {
    console.error(`❌ [DB] Falha crítica ao ler DB: ${error.message}`);
    if (cache.timestamp > 0) {
      console.log('⚠️ [Cache] Backend sobrevivendo usando dados antigos do Cache');
      return cache.properties;
    }
    throw error;
  }
}

function invalidateCache() {
  cache.timestamp = 0;
  console.log('🧹 [Cache] Invalidado (Próxima requisição forçará query no DB)');
}

/**
 * Validação Rigorosa de Autenticação (Anti-Hackers)
 */
async function getUserOrThrow(c: any): Promise<string> {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) throw new Error('FORBIDDEN: Missing Authorization header');
  
  const token = authHeader.split(' ')[1];
  if (!token) throw new Error('FORBIDDEN: Invalid token format');
  
  const { data: { user }, error } = await supabasePublic.auth.getUser(token);
  if (error || !user) throw new Error('FORBIDDEN: Invalid or expired access token');
  
  return user.id;
}

function handleHttpError(c: any, error: any) {
  const isAuthError = typeof error.message === 'string' && error.message.includes('FORBIDDEN');
  console.error(isAuthError ? '🔒 [Auth] Bloqueio:' : '❌ [Erro]:', error.message);
  return c.json({ 
    error: error.message || 'Server Exception',
    success: false 
  }, isAuthError ? 401 : 500);
}

// ==================== ROUTES ====================

/**
 * GET / - Health check
 */
app.get("/make-server-9a04a9a2/", (c) => c.json({
  status: "OK",
  message: "Vita & Carvalho API v4.0 - Robust & Secure Edition",
  timestamp: new Date().toISOString(),
}));



/**
 * POST /auth/signup - Criar Usuário Admin Automático
 */
app.post("/make-server-9a04a9a2/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    // Utilize service role admin key para injetar user 
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });

    if (error) {
      console.error("❌ [Signup] Falha no Supabase:", error.message);
      return c.json({ error: error.message, success: false }, 400);
    }

    console.log("✅ [Signup] Administrador Criado:", email);
    return c.json({ user: data.user, success: true }, 201);
  } catch (error: any) {
    console.error("❌ [Signup Exception]:", error.message);
    return handleHttpError(c, error);
  }
});

/**
 * GET /health - Monitoramento Completo
 */
app.get("/make-server-9a04a9a2/health", async (c) => {
  try {
    const data = await withTimeout(fetchFromDB());
    return c.json({
      status: "healthy",
      database: "connected",
      properties_count: data.length,
      cache: {
        hasData: cache.timestamp > 0,
        age_ms: cache.timestamp > 0 ? Date.now() - cache.timestamp : 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json({
      status: "error",
      message: error.message,
      timestamp: new Date().toISOString(),
    }, 500);
  }
});

/**
 * GET /properties - Lista todas as propriedades
 */
app.get("/make-server-9a04a9a2/properties", async (c) => {
  try {
    let properties = await loadProperties();
    
    // Suporte para busca por código do imóvel
    const codeQuery = c.req.query('code');
    if (codeQuery) {
      const searchCode = codeQuery.trim().toLowerCase();
      properties = properties.filter((p: any) => 
        p.code && p.code.toLowerCase() === searchCode
      );
    }
    
    return c.json({
      properties,
      count: properties.length,
      cached: (Date.now() - cache.timestamp) < CACHE_TTL_MS,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ [GET /properties] Erro:', error.message);
    return c.json({ error: 'Failed to load properties' }, 500);
  }
});

/**
 * POST /properties - Cria nova propriedade
 */
app.post("/make-server-9a04a9a2/properties", async (c) => {
  try {
    const userId = await getUserOrThrow(c);
    const body = await c.req.json();
    
    const newProperty = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
      createdBy: userId,
    };
    
    // Salva independentemente na key formatando para lidar com corrida de gravação
    await kv.set(`${PROPERTY_PREFIX}${newProperty.id}`, newProperty);
    invalidateCache();
    
    console.log('✅ [POST /properties] Propriedade criada e protegida:', newProperty.id);
    return c.json({ property: newProperty, success: true }, 201);
  } catch (error) {
    return handleHttpError(c, error);
  }
});

/**
 * GET /properties/:id - Busca propriedade por ID
 */
app.get("/make-server-9a04a9a2/properties/:id", async (c) => {
  try {
    const id = c.req.param('id');
    const property = await kv.get(`${PROPERTY_PREFIX}${id}`);
    
    if (!property) return c.json({ error: 'Property not found' }, 404);
    return c.json({ property });
  } catch (error) {
    return c.json({ error: 'Failed to load property' }, 500);
  }
});

/**
 * PUT /properties/:id - Atualiza propriedade
 */
app.put("/make-server-9a04a9a2/properties/:id", async (c) => {
  try {
    const userId = await getUserOrThrow(c);
    const id = c.req.param('id');
    const propertyKey = `${PROPERTY_PREFIX}${id}`;
    
    const existingProperty = await kv.get(propertyKey);
    if (!existingProperty) return c.json({ error: 'Property not found' }, 404);
    
    const body = await c.req.json();
    const updatedProperty = {
      ...existingProperty,
      ...body,
      id, // Impede alteração do ID
      updatedAt: new Date().toISOString(),
      updatedBy: userId,
    };
    
    await kv.set(propertyKey, updatedProperty);
    invalidateCache();
    
    console.log('✅ [PUT /properties/:id] Atualizado:', id);
    return c.json({ property: updatedProperty, success: true });
  } catch (error) {
    return handleHttpError(c, error);
  }
});

/**
 * DELETE /properties/:id - Deleta propriedade
 */
app.delete("/make-server-9a04a9a2/properties/:id", async (c) => {
  try {
    const userId = await getUserOrThrow(c);
    const id = c.req.param('id');
    const propertyKey = `${PROPERTY_PREFIX}${id}`;
    
    const existingProperty = await kv.get(propertyKey);
    if (!existingProperty) return c.json({ error: 'Property not found' }, 404);
    
    await kv.del(propertyKey);
    invalidateCache();
    
    console.log('✅ [DELETE /properties/:id] Deletado:', id);
    return c.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    return handleHttpError(c, error);
  }
});

/**
 * POST /upload - Upload de imagem com segurança no Parsing
 */
app.post("/make-server-9a04a9a2/upload", async (c) => {
  try {
    const userId = await getUserOrThrow(c); // Precisa estar logado
    
    const formData = await c.req.formData();
    const file = formData.get('file');
    
    // Validação rígida se de fato é Objeto e tipo Arquivo
    if (!file || typeof file === 'string' || !(file instanceof Blob)) { // Deno / Web API considera Blob / File
      return c.json({ error: 'Invalid file upload request. File object required.' }, 400);
    }
    
    const fileObj = file as File;
    const ext = fileObj.name ? fileObj.name.split('.').pop() : 'jpg';
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
    const filePath = `properties/${fileName}`;
    
    const arrayBuffer = await fileObj.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, arrayBuffer, {
        contentType: fileObj.type || 'application/octet-stream',
        upsert: false,
      });
    
    if (uploadError) throw uploadError;
    
    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 365 * 24 * 60 * 60);
    
    if (signedUrlError || !signedUrlData) throw signedUrlError;
    
    console.log('✅ [POST /upload] Upload concluído:', fileName);
    return c.json({
      url: signedUrlData.signedUrl,
      fileName,
      filePath,
      success: true,
    });
  } catch (error) {
    return handleHttpError(c, error);
  }
});

/**
 * Rota catch-all para 404 Not Found
 */
app.all("/make-server-9a04a9a2/*", (c) => c.json({
  error: 'Route not found',
  method: c.req.method,
  path: c.req.url,
}, 404));

// ==================== START SERVER ====================
console.log('🚀 [Server] Iniciando Vita & Carvalho API v4.0 Robust Edition...');
console.log('🔒 Segurança e Prevenção de Race-Conditions Aplicadas.');

Deno.serve(app.fetch);
