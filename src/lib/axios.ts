import axios from 'axios';
import { supabase } from './supabase';

const api = axios.create({
  // Puedes reemplazar esto con tu VITE_API_URL en el archivo .env si tienes un backend externo
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token de sesión de Supabase automáticamente en cada petición
api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
