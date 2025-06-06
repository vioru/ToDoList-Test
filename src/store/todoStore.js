import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const mockUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
  { id: 2, name: 'Ana García', email: 'ana@example.com' },
  { id: 3, name: 'Carlos López', email: 'carlos@example.com' },
  { id: 4, name: 'María Rodríguez', email: 'maria@example.com' },
  { id: 5, name: 'Julian Ramirez', email: 'julian@example.com' },
  { id: 6, name: 'Laura Fernández', email: 'laura@example.com' },
  { id: 7, name: 'Miguel Torres', email: 'miguel@example.com' },
  { id: 8, name: 'Sofía Martínez', email: 'sofia@example.com' },
  { id: 9, name: 'Andrés Gómez', email: 'andres@example.com' },
  { id: 10, name: 'Camila Herrera', email: 'camila@example.com' }
];

// Función auxiliar para buscar usuario
const findUserName = (users, userId) => {
  const user = users.find(u => u.id === userId);
  return user ? user.name : 'Usuario Desconocido';
};

export const useStore = create(
  persist(
    (set, get) => ({

      todos: [],
      filter: 'all',
      searchQuery: '',
      categories: ['Work', 'Personal', 'Study'],
      selectedCategory: 'all',
      users: mockUsers,
      selectedUserId: null,


      addTodo: (todo) => 
        set((state) => ({ 
          todos: [...state.todos, { ...todo, id: Date.now() }] 
        })),
      

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id 
              ? { ...todo, completed: !todo.completed }
              : todo
          )
        })),

      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map(todo =>
            todo.id === id
              ? { ...todo, ...updates }
              : todo
          )
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter(todo => todo.id !== id)
        })),


      setFilter: (filter) => set({ filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedUserId: (userId) => set({ selectedUserId: userId }),
      setTodos: (todos) => set({ todos }),

      getFilteredTodos: () => {
        const state = get();
        return state.todos.filter((todo) => {
          const matchesSearch = state.searchQuery === '' || 
            todo.title?.toLowerCase().includes(state.searchQuery.toLowerCase());
          const matchesCategory = state.selectedCategory === 'all' || 
            todo.category === state.selectedCategory;
          const matchesUser = !state.selectedUserId || 
            todo.userId === state.selectedUserId;
          
          switch (state.filter) {
            case 'completed':
              return todo.completed && matchesSearch && matchesCategory && matchesUser;
            case 'active':
              return !todo.completed && matchesSearch && matchesCategory && matchesUser;
            default:
              return matchesSearch && matchesCategory && matchesUser;
          }
        });
      },

      getStats: () => {
        const todos = get().getFilteredTodos();
        return {
          total: todos.length,
          completed: todos.filter(todo => todo.completed).length,
          active: todos.filter(todo => !todo.completed).length
        };
      }
    }),
    {
      name: 'todo-storage',
      getStorage: () => localStorage,
    }
  )
);

// Exportar función auxiliar para usar en componentes
export const getUserName = (users, userId) => findUserName(users, userId);