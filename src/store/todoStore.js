import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
      filter: 'all',
      searchQuery: '',
      selectedCategory: 'all',
      selectedUserId: null,
      users: mockUsers,


      getFilteredTodos: () => {
        const state = get();
        return state.todos.filter((todo) => {

          const matchesSearch = !state.searchQuery || 
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


      setFilter: (filter) => set({ filter }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSelectedUserId: (userId) => set({ selectedUserId: userId }),
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

export const getUserName = (users, userId) => findUserName(users, userId);