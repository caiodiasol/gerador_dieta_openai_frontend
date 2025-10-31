// Configuração da API baseada no ambiente
const getApiUrl = () => {
  // Em desenvolvimento, usa localhost
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3333';
  }
  
  // Em produção, usa a URL do Render
  return process.env.NEXT_PUBLIC_API_URL || 'https://gerador-dieta-openai-backend.onrender.com';
};

export const API_BASE_URL = getApiUrl();
