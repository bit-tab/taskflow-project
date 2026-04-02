import axios from 'axios';

// Al usar una URL relativa '/api', Axios entenderá que debe 
// buscar en el mismo dominio donde está alojada la web.
const api = axios.create({
  baseURL: '/api'
});

export const taskApi = {
  fetchTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },
  createTask: async (title: string, priority: string = 'medium') => {
    const response = await api.post('/tasks', { title, priority });
    return response.data;
  },
  updateTask: async (id: string, data: { title?: string, priority?: string }) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },
  toggleTask: async (id: string) => {
    const response = await api.patch(`/tasks/${id}/toggle`);
    return response.data;
  },
  deleteTask: async (id: string) => {
    await api.delete(`/tasks/${id}`);
  }
};