// Configuração da API baseada no ambiente
const getApiUrl = () => {
  // Em desenvolvimento, usa localhost
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3333';
  }
  
  // Em produção, usa a URL do Render
  return 'https://gerador-dieta-openai-backend.onrender.com';
};

export const API_BASE_URL = getApiUrl();
