# Sistema de Gerenciamento de Imóveis - Vita & Carvalho

## 🎯 Visão Geral

Sistema completo de gerenciamento de imóveis com painel administrativo, landing page dinâmica e páginas individuais para cada propriedade.

## 🔐 Acesso ao Painel Administrativo

### Login
- **URL**: `/admin/login`
- **Senha Demo**: `admin123`
- **Link**: Disponível no footer do site (texto "Admin")

### Funcionalidades do Admin

1. **Dashboard com Estatísticas**
   - Total de imóveis cadastrados
   - Imóveis para venda
   - Imóveis para locação

2. **Adicionar Novo Imóvel**
   - Formulário completo com todos os campos
   - Upload de imagem principal
   - Galeria de imagens
   - Características/features personalizadas
   - Badge opcional (Destaque, Lançamento, etc.)

3. **Gerenciar Imóveis**
   - Visualizar todos os imóveis em tabela
   - Editar imóveis existentes
   - Excluir imóveis
   - Ver página individual de cada imóvel

## 📱 Funcionalidades do Site

### Landing Page (/)
- Hero section com busca
- Imóveis em destaque (6 primeiros)
- Estatísticas da empresa
- Seções premium: Serviços, Processo, Equipe
- Depoimentos de clientes
- CTA para contato
- Botão flutuante de WhatsApp

### Página do Imóvel (/imovel/:id)
- Galeria de imagens com visualização ampliada
- Informações completas do imóvel
- Especificações detalhadas (quartos, banheiros, área, vagas)
- Lista de características
- Botão de contato direto via WhatsApp
- Compartilhamento e favoritos

## 🗂️ Estrutura de Arquivos

```
/src/app/
├── pages/
│   ├── Home.tsx              # Landing page principal
│   ├── PropertyDetail.tsx    # Página individual do imóvel
│   ├── Admin.tsx            # Painel administrativo
│   └── AdminLogin.tsx       # Login do admin
├── components/
│   ├── Navbar.tsx           # Menu de navegação
│   ├── Hero.tsx             # Seção principal
│   ├── FeaturedProperties.tsx # Grid de imóveis
│   ├── PropertyCard.tsx     # Card individual de imóvel
│   ├── Services.tsx         # Seção de serviços
│   ├── Process.tsx          # Processo de compra
│   ├── Team.tsx             # Equipe de corretores
│   ├── Stats.tsx            # Estatísticas
│   ├── Differentials.tsx    # Diferenciais
│   ├── Testimonials.tsx     # Depoimentos
│   ├── CTA.tsx              # Call to action
│   ├── Footer.tsx           # Rodapé
│   ├── WhatsAppButton.tsx   # Botão flutuante
│   └── admin/
│       └── PropertyForm.tsx # Formulário de imóvel
├── context/
│   ├── PropertyContext.tsx  # Gerenciamento de imóveis
│   └── AuthContext.tsx      # Autenticação admin
├── routes.ts                # Configuração de rotas
└── App.tsx                  # App principal
```

## 💾 Armazenamento de Dados

Os dados são armazenados localmente usando `localStorage`:

- **Chave dos Imóveis**: `vitaecarvalho_properties`
- **Chave de Autenticação**: `vitaecarvalho_auth`

### Imóveis Padrão

O sistema vem com 6 imóveis pré-cadastrados:
1. Cobertura Duplex - Jardins
2. Apartamento Moderno - Vila Mariana
3. Casa em Condomínio - Alphaville
4. Loft Contemporâneo - Pinheiros
5. Apartamento Compacto - Moema (Locação)
6. Penthouse de Luxo - Itaim Bibi

## 🎨 Design System

### Cores
- **Principal**: `#00A896` (Turquesa)
- **Secundária**: `#028174` (Verde-água escuro)
- **Texto**: `#1C1C1C`, `#2C2C2C`, `#5A5754`
- **Backgrounds**: Gradientes de `#F0F7F6` a white

### Tipografia
- **Fonte**: Poppins (300, 400, 500, 600, 700, 800, 900)
- **Títulos**: Bold/Extrabold
- **Corpo**: Light/Regular

## 🔄 Fluxo de Dados

1. **PropertyContext** gerencia todo o estado dos imóveis
2. Operações CRUD são persistidas no localStorage
3. Componentes consomem dados via hook `useProperties()`
4. Atualizações são refletidas em tempo real

## 📞 Integração WhatsApp

### URLs de Contato
- **Geral**: `https://wa.me/5511999999999`
- **Por Imóvel**: Mensagem personalizada com título e localização

### Botões WhatsApp
- Flutuante na landing page (canto inferior direito)
- No header da página de detalhes
- Na sidebar de contato
- No CTA principal

## 🚀 Como Usar

### 1. Acessar o Site
Navegue para a URL principal (`/`)

### 2. Ver Imóveis
- Clique em qualquer card de imóvel
- Navegação automática para `/imovel/:id`

### 3. Adicionar Novo Imóvel
1. Acesse `/admin/login`
2. Digite a senha: `admin123`
3. Clique em "Adicionar Imóvel"
4. Preencha o formulário
5. Adicione características e galeria
6. Salve o imóvel

### 4. Editar Imóvel
1. No painel admin, clique no ícone de edição
2. Modifique os campos desejados
3. Salve as alterações

### 5. Excluir Imóvel
1. No painel admin, clique no ícone de lixeira
2. Confirme a exclusão

## 🔒 Segurança

⚠️ **IMPORTANTE**: Este é um sistema de demonstração com dados mock locais.

**Para produção, você deveria:**
- Implementar autenticação real (ex: Supabase, Firebase)
- Armazenar dados em banco de dados
- Adicionar validação de servidor
- Implementar upload real de imagens
- Usar variáveis de ambiente para senhas
- Adicionar proteção CSRF
- Implementar rate limiting

## 📸 Upload de Imagens

Atualmente, o sistema aceita URLs de imagens. Para adicionar uma imagem:

1. Faça upload para um serviço de hospedagem (Unsplash, Cloudinary, etc.)
2. Copie a URL da imagem
3. Cole no campo "URL da Imagem Principal"
4. Adicione URLs adicionais para a galeria

**Sugestões de fontes de imagem:**
- Unsplash (imagens gratuitas de alta qualidade)
- Pexels
- Cloudinary (armazenamento profissional)

## 🎯 Recursos Adicionais

- ✅ Sistema de rotas com React Router
- ✅ Responsivo para mobile, tablet e desktop
- ✅ Animações suaves e transições
- ✅ Cards interativos com hover effects
- ✅ Galeria de imagens com thumbnails
- ✅ Filtros e badges personalizados
- ✅ Formulários validados
- ✅ Toast notifications (pronto para implementar)
- ✅ SEO-friendly (URLs amigáveis)

## 🐛 Troubleshooting

### Imóveis não aparecem
- Verifique o localStorage do navegador
- Limpe o cache e recarregue

### Não consigo fazer login
- Senha: `admin123`
- Verifique se o JavaScript está habilitado

### Imagens não carregam
- Verifique se as URLs são válidas
- Teste as URLs diretamente no navegador
- Use HTTPS para as imagens

## 📈 Próximos Passos Sugeridos

1. **Backend Real**: Integrar com Supabase ou Firebase
2. **Upload de Imagens**: Implementar upload direto de arquivos
3. **Busca e Filtros**: Sistema de busca avançada
4. **Favoritos**: Salvar imóveis favoritos
5. **Comparação**: Comparar múltiplos imóveis
6. **Mapa**: Integração com Google Maps
7. **Chat**: Sistema de chat em tempo real
8. **Analytics**: Rastreamento de visualizações
9. **SEO**: Meta tags dinâmicas
10. **PWA**: Transformar em Progressive Web App

---

**Desenvolvido para Vita & Carvalho Imóveis** 🏡
