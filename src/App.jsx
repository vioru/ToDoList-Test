import React, { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import { useStore } from './store/todoStore';

function App() {
  const fetchTodos = useStore(state => state.fetchTodos);
  const loading = useStore(state => state.loading);
  const error = useStore(state => state.error);
  const initialized = useStore(state => state.initialized);
  const todos = useStore(state => state.todos);

  useEffect(() => {
    // Solo hacer fetch si no está inicializado o no hay todos
    if (!initialized || todos.length === 0) {
      fetchTodos();
    }
  }, [initialized, todos.length, fetchTodos]); 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Cargando tareas...</span>
      </div>
    );
  }

  return (
    <MainLayout 
      loading={loading}
      error={error}
      onRefresh={fetchTodos}
    />
  );
}

export default App;