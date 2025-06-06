import React, { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import { useTodos } from './hooks/useTodos';

function App() {
  const { 
    loading, 
    error, 
    useMockApi, 
    loadTodos, 
    toggleApiMode, 
    clearError 
  } = useTodos();

  // Cargar todos al iniciar la aplicación
  useEffect(() => {
    loadTodos();
  }, [useMockApi]); // Recargar cuando cambie el modo de API

  return (
    <MainLayout 
      loading={loading}
      error={error}
      onRefresh={loadTodos}
      onToggleApi={toggleApiMode}
      onClearError={clearError}
    />
  );
}

export default App;