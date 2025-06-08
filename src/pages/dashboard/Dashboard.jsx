import MainLayout from '../../components/layout/main-layout/MainLayout';
import { useStore } from '../../store/todoStore';

const Dashboard = () => {
  const fetchTodos = useStore(state => state.fetchTodos);
  const error = useStore(state => state.error);

  return (
    <MainLayout 
      error={error}
      onRefresh={fetchTodos}
    />
  );
};

export default Dashboard;