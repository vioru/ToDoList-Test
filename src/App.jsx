import React, { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import { useStore } from './store/todoStore';

function App() {
  const fetchTodos = useStore(state => state.fetchTodos);
  const initialLoading = useStore(state => state.initialLoading); 
  const error = useStore(state => state.error);
  const initialized = useStore(state => state.initialized);
  const todos = useStore(state => state.todos);

  useEffect(() => {

    if (!initialized || todos.length === 0) {
      fetchTodos();
    }
  }, [initialized, todos.length, fetchTodos]); 


  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Cargando tareas...</span>
      </div>
    );
  }

  return (
    <MainLayout 
      error={error}
      onRefresh={fetchTodos}
    />
  );
}

export default App;