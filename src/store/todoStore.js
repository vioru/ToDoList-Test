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
      initialLoading: false, 
      operationLoading: false, 
      error: null,
      filter: 'all',
      searchQuery: '',
      selectedUserId: null,
      users: mockUsers,
      initialized: false,
      currentPage: 1,

      fetchTodos: async () => {
        const state = get();
        if (state.todos.length === 0 || !state.initialized) {
          set({ initialLoading: true, error: null });
          try {
            const response = await api.get('/todos');
            set({ 
              todos: response.data, 
              initialLoading: false,
              initialized: true 
            });
          } catch (error) {
            set({ error: error.message, initialLoading: false });
          }
        }
      },


addTodo: async (todoData) => {
  set({ operationLoading: true, error: null });
  try {

    const newId = Date.now();
    const newTodo = {
      ...todoData,
      id: newId,
      createdAt: todoData.createdAt || new Date().toISOString()
    };

    const response = await api.post('/todos', newTodo);
    
    set((state) => ({ 
      todos: [newTodo, ...state.todos], 
      operationLoading: false,
      initialized: true
    }));
  } catch (error) {
    set({ error: error.message, operationLoading: false });
  }
},

      updateTodo: async (id, updates) => {
        try {
          set((state) => {
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
        set({ operationLoading: true, error: null });
        try {
          set((state) => ({
            todos: state.todos.filter(todo => todo.id !== id),
            operationLoading: false
          }));
        } catch (error) {
          set({ error: error.message, operationLoading: false });
        }
      },

resetPagination: () => set({ currentPage: 1 }),
setCurrentPage: (page) => set({ currentPage: page }),

getFilteredTodos: () => {
  const state = get();
  const { 
    todos, 
    filter, 
    searchQuery, 
    selectedUserId, 
  } = state;

  return todos
    .filter((todo) => {
      const matchesSearch = !searchQuery || 
        todo.title?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesUser = !selectedUserId || 
        todo.userId === selectedUserId;

      const matchesStatus = filter === 'all' ? true :
        filter === 'completed' ? todo.completed : !todo.completed;

      return matchesSearch && 
             matchesUser && 
             matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.id);
      const dateB = new Date(b.createdAt || b.id);
      return dateB - dateA;
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