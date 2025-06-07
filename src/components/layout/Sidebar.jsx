import {
  Drawer,
  Divider,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useStore } from '../../store/todoStore';
import FilterButtons from '../filters/FilterButtons';
import SelectUSers from '../filters/SelectUsers';

const Sidebar = ({ }) => {
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


      <Box sx={{ p: 3 }}>
        <div>

          <Typography variant="h4">
            TaskFlow
          </Typography>
          <Button variant="contained"
            sx={{
              borderRadius: '25px',
              backgroundColor: 'transparent',
              color: 'text.primary',
              boxShadow: 'none',
              p: 0,
              my: 1,
              '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' },
              textTransform: 'none',
              textDecoration: 'underline',
            }}
            onClick={() => {
              setFilter('all');
              setSelectedUserId(null);
            }}
          >
            Borrar filtros
          </Button>
          <div>
            <Typography variant="overline" color="text.primary" sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
              Resumen de Tareas
              {selectedUserId && (
                <Typography variant="caption" display="block" color="text.secondary">
                  Usuario: {selectedUser ? selectedUser.name : 'Usuario Desconocido'}
                </Typography>
              )}
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 1,
              bgcolor: 'background.paper',
              borderRadius: 1
            }}>
              <Typography variant="body2">
                Completadas: {stats.completed}
              </Typography>
              <Typography variant="body2">
                Pendientes: {stats.active}
              </Typography>
            </Box>
          </div>

        </div>



      </Box>

      <Divider />
      <SelectUSers />

      <Divider />
      <FilterButtons />


    </Drawer>
  );
};

export default Sidebar;