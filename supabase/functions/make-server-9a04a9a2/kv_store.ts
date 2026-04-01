import { createClient } from "npm:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") || "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
);

const BUCKET = "kv-store-db";
const FILE_PATH = "database.json";

// Inicializa ou pega os dados do arquivo
const loadData = async (): Promise<Record<string, any>> => {
  // Garantir bucket existe (criado silenciosamente se não)
  await supabase.storage.createBucket(BUCKET, { public: false });
  
  const { data, error } = await supabase.storage.from(BUCKET).download(FILE_PATH);
  if (error || !data) {
    if (error?.message?.includes('not found') || error?.message?.includes('The resource was not found')) {
      return {}; 
    }
    console.error("Storage load error:", error?.message);
    return {};
  }
  
  try {
    const text = await data.text();
    return JSON.parse(text);
  } catch (e) {
    return {};
  }
};

const saveData = async (data: Record<string, any>): Promise<void> => {
  const jsonStr = JSON.stringify(data, null, 2);
  const file = new File([jsonStr], FILE_PATH, { type: 'application/json' });
  
  const { error } = await supabase.storage.from(BUCKET).upload(FILE_PATH, file, {
    upsert: true,
    contentType: 'application/json'
  });
  
  if (error) {
    throw new Error(`Failed to save KV data: ${error.message}`);
  }
};

// Set stores a key-value pair
export const set = async (key: string, value: any): Promise<void> => {
  const data = await loadData();
  data[key] = value;
  await saveData(data);
};

// Get retrieves a key-value pair
export const get = async (key: string): Promise<any> => {
  const data = await loadData();
  return data[key];
};

// Delete deletes a key-value pair
export const del = async (key: string): Promise<void> => {
  const data = await loadData();
  delete data[key];
  await saveData(data);
};

// Sets multiple key-value pairs
export const mset = async (keys: string[], values: any[]): Promise<void> => {
  const data = await loadData();
  keys.forEach((k, i) => {
    data[k] = values[i];
  });
  await saveData(data);
};

// Gets multiple key-value pairs
export const mget = async (keys: string[]): Promise<any[]> => {
  const data = await loadData();
  return keys.map((k) => data[k]);
};

// Deletes multiple key-value pairs
export const mdel = async (keys: string[]): Promise<void> => {
  const data = await loadData();
  keys.forEach((k) => {
    delete data[k];
  });
  await saveData(data);
};

// Search for key-value pairs by prefix
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const data = await loadData();
  const results = [];
  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith(prefix)) {
      results.push(value);
    }
  }
  return results;
};