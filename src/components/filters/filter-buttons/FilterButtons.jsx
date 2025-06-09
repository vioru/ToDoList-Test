import {
  Dashboard,
  CheckCircle,
  Schedule,
  CheckCircleOutline,
  DashboardCustomizeOutlined,
  DashboardOutlined,
} from '@mui/icons-material';
import { useStore } from '../../../store/todoStore';

const FilterList = () => {
  const todos = useStore(state => state.todos);
  const currentFilter = useStore(state => state.filter);
  const setFilter = useStore(state => state.setFilter);
  const selectedUserId = useStore(state => state.selectedUserId);

  const filteredByUser = selectedUserId 
    ? todos.filter(todo => todo.userId === selectedUserId)
    : todos;

  const stats = {
    total: filteredByUser.length,
    completed: filteredByUser.filter(todo => todo.completed).length,
    active: filteredByUser.filter(todo => !todo.completed).length
  };

  const filters = [
    {
      id: 'all',
      label: 'Todas las tareas',
      icon: <DashboardOutlined className="text-xl" />,
      count: stats.total,
      colorClasses: {
        bgSelected: 'bg-primary-100',
        icon: 'text-primary-500',
        badge: 'bg-primary-300  text-white'
      }
    },
    {
      id: 'active',
      label: 'Pendientes',
      icon: <Schedule className="text-xl" />,
      count: stats.active,
      colorClasses: {
        bgSelected: 'bg-orange-50',
        icon: 'text-orange-500',
        badge: 'bg-orange-500 text-white'
      }
    },
    {
      id: 'completed',
      label: 'Finalizadas',
      icon: <CheckCircleOutline className="text-xl" />,
      count: stats.completed,
      colorClasses: {
        bgSelected: 'bg-green-50',
        icon: 'text-green-500',
        badge: 'bg-green-500 text-white'
      }
    }
  ];

  return (
    <div className="px-4 space-y-2 mt-3">
      <h3 className="text-base font-bold text-gray-800 mb-2">
        Filtrar por estado </h3>
      {filters.map(({ id, label, icon, count, colorClasses }) => (
        <button
          key={id}
          onClick={() => setFilter(id)}
          className={`
            w-full rounded-2xl py-3 px-4 flex items-center transition-colors
            ${currentFilter === id 
              ? `${colorClasses.bgSelected}` 
              : `hover:bg-gray-50`
            }
          `}
        >
          <div className={`mr-3 ${colorClasses.icon}`}>
            {icon}
          </div>

          
          <span className="flex-1 text-left font-medium text-gray-800">
            {label}
          </span>
          
          <span className={`
            inline-flex items-center justify-center px-3 py-1 
            rounded-full text-sm font-medium ${colorClasses.badge}
          `}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterList;