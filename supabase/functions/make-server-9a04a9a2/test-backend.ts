/**
 * Script de Teste do Backend - Vita & Carvalho
 * 
 * Este arquivo demonstra como testar as rotas do backend.
 * Não é executado automaticamente - apenas para referência.
 */

const API_URL = 'https://giwytxljvvqpipovezji.supabase.co/functions/v1/make-server-9a04a9a2';
const ANON_KEY = 'your-anon-key-here';

// ========== HEALTH CHECK ==========
async function testHealthCheck() {
  console.log('\n🏥 Testando Health Check...');
  
  const response = await fetch(`${API_URL}/health`, {
    headers: {
      'Authorization': `Bearer ${ANON_KEY}`,
    },
  });
  
  const data = await response.json();
  console.log('✅ Health Check:', data);
}

// ========== GET PROPERTIES ==========
async function testGetProperties() {
  console.log('\n📋 Testando GET /properties...');
  
  const response = await fetch(`${API_URL}/properties`, {
    headers: {
      'Authorization': `Bearer ${ANON_KEY}`,
    },
  });
  
  const data = await response.json();
  console.log(`✅ ${data.properties.length} propriedades encontradas`);
  console.log('Cache:', data.cached);
}

// ========== CREATE PROPERTY ==========
async function testCreateProperty(authToken: string) {
  console.log('\n➕ Testando POST /properties...');
  
  const newProperty = {
    title: 'Casa de Teste',
    price: 'R$ 500.000',
    location: 'São Paulo - SP',
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parking: 2,
    image: 'https://via.placeholder.com/400x300',
    description: 'Propriedade de teste criada via API',
    features: ['Piscina', 'Churrasqueira', 'Jardim'],
    gallery: ['https://via.placeholder.com/400x300'],
    type: 'Casa',
    status: 'Venda',
  };
  
  const response = await fetch(`${API_URL}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(newProperty),
  });
  
  const data = await response.json();
  console.log('✅ Propriedade criada:', data.property.id);
  return data.property.id;
}

// ========== UPDATE PROPERTY ==========
async function testUpdateProperty(authToken: string, propertyId: string) {
  console.log('\n✏️ Testando PUT /properties/:id...');
  
  const updates = {
    price: 'R$ 550.000',
    title: 'Casa de Teste - ATUALIZADA',
  };
  
  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify(updates),
  });
  
  const data = await response.json();
  console.log('✅ Propriedade atualizada:', data.property.title);
}

// ========== DELETE PROPERTY ==========
async function testDeleteProperty(authToken: string, propertyId: string) {
  console.log('\n🗑️ Testando DELETE /properties/:id...');
  
  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${authToken}`,
    },
  });
  
  const data = await response.json();
  console.log('✅ Propriedade deletada:', data.success);
}



// ========== EXEMPLO DE EXECUÇÃO ==========
/*
// 1. Verificar saúde do servidor
await testHealthCheck();

// 2. Listar propriedades
await testGetProperties();

// 3. Criar novo usuário
await testSignup();

// 4. Login e obter token (use o Supabase client)
// const token = 'seu-token-aqui';

// 5. Criar propriedade (requer auth)
// const propertyId = await testCreateProperty(token);

// 6. Atualizar propriedade (requer auth)
// await testUpdateProperty(token, propertyId);

// 7. Deletar propriedade (requer auth)
// await testDeleteProperty(token, propertyId);
*/

export {
  testHealthCheck,
  testGetProperties,
  testCreateProperty,
  testUpdateProperty,
  testDeleteProperty,

};
