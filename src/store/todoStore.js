import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const mockUsers = [
  { id: 1, name: 'Juan Pérez' },
  { id: 2, name: 'Ana García'},
  { id: 3, name: 'Carlos López' },
  { id: 4, name: 'María Rodríguez' },
  { id: 5, name: 'Julian Ramirez' },
  { id: 6, name: 'Laura Fernández' },
  { id: 7, name: 'Miguel Torres' },
  { id: 8, name: 'Sofía Martínez' },
  { id: 9, name: 'Andrés Gómez' },
  { id: 10, name: 'Camila Herrera' }
];


const findUserName = (users, userId) => {
  const user = users.find(u => u.id === userId);
  return user ? user.name : 'Usuario Desconocido';
};

export const useStore = create(
  persist(
    (set, get) => ({

      todos: [],
      loading: false,
      error: null,
      filter: 'all',
      searchQuery: '',
      selectedCategory: 'all',
      selectedUserId: null,
      users: mockUsers,
      initialized: false,


      fetchTodos: async () => {
        // Solo hacer fetch si no hay datos o si no está inicializado
        const state = get();
        if (state.todos.length === 0 || !state.initialized) {
          set({ loading: true, error: null });
          try {
            const response = await api.get('/todos');
            set({ 
              todos: response.data, 
              loading: false,
              initialized: true 
            });
          } catch (error) {
            set({ error: error.message, loading: false });
          }
        }
      },

      // Modificar las otras acciones para mantener initialized
      addTodo: async (todoData) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/todos', todoData);
          set((state) => ({ 
            todos: [...state.todos, response.data],
            loading: false,
            initialized: true
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      updateTodo: async (id, updates) => {
        try {
          set((state) => {
            // Crear una nueva referencia del array para forzar la actualización
            const newTodos = state.todos.map(todo => 
              todo.id === id ? { ...todo, ...updates } : todo
            );

            return {
              todos: newTodos,
              error: null
            };
          });
        } catch (error) {
          console.error('Error updating todo:', error);
          set({ error: error.message });
        }
      },

      removeTodo: async (id) => {
        set({ loading: true, error: null });
        try {
          set((state) => ({
            todos: state.todos.filter(todo => todo.id !== id),
            loading: false
          }));
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },


      getFilteredTodos: () => {
        const state = get();
        const { 
          todos, 
          filter, 
          searchQuery, 
          selectedUserId, 
          selectedCategory 
        } = state;

        return todos.filter((todo) => {
          // 1. Filtrar por búsqueda
          const matchesSearch = !searchQuery || 
            todo.title?.toLowerCase().includes(searchQuery.toLowerCase());

          // 2. Filtrar por usuario seleccionado
          const matchesUser = !selectedUserId || 
            todo.userId === selectedUserId;

          // 3. Filtrar por categoría
          const matchesCategory = selectedCategory === 'all' || 
            todo.category === selectedCategory;

          // 4. Filtrar por estado (completada/pendiente)
          const matchesStatus = filter === 'all' ? true :
            filter === 'completed' ? todo.completed : !todo.completed;

          // Aplicar todos los filtros en conjunto
          return matchesSearch && 
                 matchesUser && 
                 matchesCategory && 
                 matchesStatus;
        });
      },

      setFilter: (filter) => {
        set({ filter });
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setSelectedUserId: (userId) => {
        set({ selectedUserId: userId });
      }
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export const getUserName = (users, userId) => findUserName(users, userId);