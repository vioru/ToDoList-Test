import React, { useEffect } from 'react';
import MainLayout from './components/layout/main-layout/MainLayout';
import { useStore } from './store/todoStore';
import LoadingOverlay from './components/status/LoadingOverlay';

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
  <LoadingOverlay/>
  }

  return (
    <MainLayout 
      error={error}
      onRefresh={fetchTodos}
    />
  );
}

export default App;