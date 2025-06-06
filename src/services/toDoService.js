import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Configurar axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const todoService = {
  // Obtener todos los todos
  getAllTodos: async () => {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching todos: ' + error.message);
    }
  },

  // Obtener un todo específico
  getTodoById: async (id) => {
    try {
      const response = await api.get(`/todos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching todo: ' + error.message);
    }
  },

  // Crear un nuevo todo
  createTodo: async (todoData) => {
    try {
      const response = await api.post('/todos', {
        title: todoData.text,
        completed: todoData.completed || false,
        userId: 1 // JSONPlaceholder requiere userId
      });
      
      // Transformar la respuesta para que coincida con nuestro formato
      return {
        id: response.data.id,
        text: response.data.title,
        completed: response.data.completed,
        priority: todoData.priority || 'medium',
        dueTime: todoData.dueTime || '08:30 PM',
        comments: todoData.comments || 0,
        userId: response.data.userId
      };
    } catch (error) {
      throw new Error('Error creating todo: ' + error.message);
    }
  },

  // Actualizar un todo
  updateTodo: async (id, todoData) => {
    try {
      const response = await api.put(`/todos/${id}`, {
        id: id,
        title: todoData.text,
        completed: todoData.completed,
        userId: todoData.userId || 1
      });
      
      return {
        id: response.data.id,
        text: response.data.title,
        completed: response.data.completed,
        priority: todoData.priority || 'medium',
        dueTime: todoData.dueTime || '08:30 PM',
        comments: todoData.comments || 0,
        userId: response.data.userId
      };
    } catch (error) {
      throw new Error('Error updating todo: ' + error.message);
    }
  },

  // Eliminar un todo
  deleteTodo: async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      return { success: true };
    } catch (error) {
      throw new Error('Error deleting todo: ' + error.message);
    }
  },

  // Marcar como completado/incompleto
  toggleTodo: async (id, completed) => {
    try {
      const response = await api.patch(`/todos/${id}`, {
        completed: completed
      });
      
      return {
        id: response.data.id,
        completed: response.data.completed
      };
    } catch (error) {
      throw new Error('Error toggling todo: ' + error.message);
    }
  }
};