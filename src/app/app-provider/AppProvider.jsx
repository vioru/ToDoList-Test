import { useEffect } from 'react';
import { useStore } from '../../store/todoStore';
import LoadingOverlay from '../../components/status/LoadingOverlay';

export const AppProvider = ({ children }) => {
  const fetchTodos = useStore(state => state.fetchTodos);
  const initialLoading = useStore(state => state.initialLoading); 
  const initialized = useStore(state => state.initialized);
  const todos = useStore(state => state.todos);


  useEffect(() => {
    if (!initialized || todos.length === 0) {
      fetchTodos();
    }
  }, [initialized, todos.length, fetchTodos]); 


  if (initialLoading) {
    return <LoadingOverlay loading={true} />;
  }

  return children;
};

