/**
 * API Helper - Vita & Carvalho
 * 
 * Utilitários para facilitar comunicação com o backend
 */

import { projectId, publicAnonKey } from '/utils/supabase/info';

export const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9a04a9a2`;

/**
 * Obtém o token de autenticação do localStorage
 */
export function getAuthToken(): string {
  return localStorage.getItem('auth_token') || publicAnonKey;
}

/**
 * Verifica se o usuário está autenticado
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem('auth_token');
  return !!token && token !== publicAnonKey;
}

/**
 * Headers padrão para requisições autenticadas
 */
export function getAuthHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`,
  };
}

/**
 * Headers padrão para requisições públicas
 */
export function getPublicHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`,
  };
}

/**
 * Faz requisição GET ao backend
 */
export async function apiGet<T>(endpoint: string, authenticated = false): Promise<T> {
  const headers = authenticated ? getAuthHeaders() : getPublicHeaders();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'GET',
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

/**
 * Faz requisição POST ao backend
 */
export async function apiPost<T>(endpoint: string, data: any, authenticated = false): Promise<T> {
  const headers = authenticated ? getAuthHeaders() : getPublicHeaders();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

/**
 * Faz requisição PUT ao backend
 */
export async function apiPut<T>(endpoint: string, data: any, authenticated = false): Promise<T> {
  const headers = authenticated ? getAuthHeaders() : getPublicHeaders();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

/**
 * Faz requisição DELETE ao backend
 */
export async function apiDelete<T>(endpoint: string, authenticated = false): Promise<T> {
  const headers = authenticated ? getAuthHeaders() : getPublicHeaders();
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'DELETE',
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  return response.json();
}

/**
 * Verifica a saúde do backend
 */
export async function checkBackendHealth() {
  try {
    const response = await apiGet<{
      status: string;
      version: string;
      timestamp: number;
      cache: {
        hasData: boolean;
        itemCount: number;
        age: number;
      };
    }>('/health');
    
    console.log('🏥 Backend Health:', response);
    console.log('📊 Cache:', {
      items: response.cache.itemCount,
      age: `${(response.cache.age / 1000).toFixed(1)}s`,
      fresh: response.cache.age < 30000,
    });
    
    return response;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    throw error;
  }
}

/**
 * Faz upload de imagem convertendo File para base64
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  
  const headers = getAuthHeaders();
  // We need to remove Content-Type so the browser sets the correct boundary for multipart/form-data
  delete (headers as Record<string, string>)['Content-Type'];

  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers,
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  
  const data = await response.json();
  console.log('✅ Imagem enviada:', data.fileName);
  return data.url;
}

/**
 * Remove imagem do storage
 */
export async function deleteImage(path: string): Promise<void> {
  await apiDelete(`/upload/${path}`, false);
  console.log('🗑️ Imagem removida:', path);
}

// =================== LOCATIONS ===================

export interface LocationCategory {
  id: string;
  type: 'city' | 'neighborhood';
  name: string;
  parentId?: string; // e.g. a neighborhood belongs to a city
  createdAt: string;
}

export async function getLocations(): Promise<LocationCategory[]> {
  const data = await apiGet<{ locations: LocationCategory[] }>('/locations');
  return data.locations || [];
}

export async function addLocation(location: Omit<LocationCategory, 'id' | 'createdAt'>): Promise<LocationCategory> {
  const data = await apiPost<{ location: LocationCategory }>('/locations', location, true);
  return data.location;
}

export async function deleteLocation(id: string): Promise<void> {
  await apiDelete(`/locations/${id}`, true);
}

// =================== POSTS (BLOG) ===================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export async function getPosts(): Promise<BlogPost[]> {
  const data = await apiGet<{ posts: BlogPost[] }>('/posts');
  return data.posts || [];
}

export async function getPost(id: string): Promise<BlogPost> {
  const data = await apiGet<{ post: BlogPost }>(`/posts/${id}`);
  return data.post;
}

export async function addPost(post: Omit<BlogPost, 'id' | 'createdAt'>): Promise<BlogPost> {
  const data = await apiPost<{ post: BlogPost }>('/posts', post, true);
  return data.post;
}

export async function updatePost(id: string, post: Partial<BlogPost>): Promise<BlogPost> {
  const data = await apiPut<{ post: BlogPost }>(`/posts/${id}`, post, true);
  return data.post;
}

export async function deletePost(id: string): Promise<void> {
  await apiDelete(`/posts/${id}`, true);
}
