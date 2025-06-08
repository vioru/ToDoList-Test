import { Drawer, Divider, Button } from '@mui/material';
import { useStore } from '../../store/todoStore';
import FilterButtons from '../filters/FilterButtons';
import SelectUsers from '../filters/SelectUsers';

const Sidebar = ({ onToggleApi }) => {
  const todos = useStore(state => state.todos);
  const setFilter = useStore(state => state.setFilter);
  const users = useStore(state => state.users);
  const selectedUserId = useStore(state => state.selectedUserId);
  const setSelectedUserId = useStore(state => state.setSelectedUserId);
  const selectedUser = users.find(u => u.id === selectedUserId);

  const filteredByUser = selectedUserId
    ? todos.filter(todo => todo.userId === selectedUserId)
    : todos;

  const stats = {
    total: filteredByUser.length,
    completed: filteredByUser.filter(todo => todo.completed).length,
    active: filteredByUser.filter(todo => !todo.completed).length
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 300,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 300,
          boxSizing: 'border-box',
          bgcolor: 'background.default'
        },
      }}
    >
      <div className="p-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            TaskFlow
          </h1>
          
          <Button 
            variant="text"
            className="!rounded-full !bg-transparent !text-primary-500 !shadow-none !p-0 !my-2 hover:!bg-transparent hover:!shadow-none !normal-case !underline"
            onClick={() => {
              setFilter('all');
              setSelectedUserId(null);

            }}
          >
            Borrar filtros
          </Button>
          
          <div className="mt-4">
            <h3 className="text-base font-bold text-gray-800 mb-1">
              Resumen de Tareas
            </h3>
            {selectedUserId && (
              <p className="text-sm text-gray-500 mb-2">
                Usuario: {selectedUser ? selectedUser.name : 'Usuario Desconocido'}
              </p>
            )}
            
            <div className="flex justify-between mt-2 bg-white p-3 rounded-lg">
              <span className="text-sm text-gray-600">
                Completadas: {stats.completed}
              </span>
              <span className="text-sm text-gray-600">
                Pendientes: {stats.active}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <SelectUsers />

      <Divider />
      <FilterButtons />
    </Drawer>
  );
};

Sidebar.propTypes = {
  onToggleApi: PropTypes.func,
};

export default Sidebar;