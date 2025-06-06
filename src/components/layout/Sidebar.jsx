import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Badge,
  ListItemButton,
  Select,
  MenuItem,
  FormControl,
  Button,
} from '@mui/material';
import {
  Dashboard,
  CheckCircle,
  Schedule,
  Person
} from '@mui/icons-material';
import { useStore } from '../../store/todoStore';

const Sidebar = ({ }) => {
  const todos = useStore(state => state.todos);
  const currentFilter = useStore(state => state.filter);
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

  const filters = [
    {
      id: 'all',
      label: 'Todas las tareas',
      icon: <Dashboard />,
      count: stats.total,
      color: 'primary'
    },
    {
      id: 'active',
      label: 'Pendientes',
      icon: <Schedule />,
      count: stats.active,
      color: 'warning'
    },
    {
      id: 'completed',
      label: 'Completadas',
      icon: <CheckCircle />,
      count: stats.completed,
      color: 'success'
    }
  ];

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
            <Typography variant="overline" color="text.primary" sx={{ textTransform: 'none' ,fontWeight: 'bold', fontSize:'1rem'}}>
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

      <Box sx={{ p: 3 }}>
        <Typography variant="overline" color="text.primary" gutterBottom sx={{ textTransform: 'none',fontWeight: 'bold', fontSize:'1rem' }}>
          Filtrar por Usuario
        </Typography>
        <FormControl fullWidth size="small">
          <Select
            value={selectedUserId ?? ''}
            onChange={e => {
              const value = e.target.value;
              setFilter('all');
              setSelectedUserId(value === '' ? null : Number(value));
            }}
            displayEmpty
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderRadius: '25px'
              }
            }}
          >
            <MenuItem value="">Todos los usuarios</MenuItem>
            {users.map(user => (
              <MenuItem key={user.id} value={user.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person fontSize="small" />
                  {user.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>


      <Divider />

      <List sx={{ px: 2 }}>
        {filters.map(({ id, label, icon, count, color }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton
              selected={currentFilter === id}
              onClick={() => setFilter(id)}
              sx={{
                borderRadius: 25,
                m: 1,
                py: 1.5,
                px: 2,
                display: 'flex',
                alignItems: 'center',
                '&.Mui-selected': {
                  bgcolor: `${color}.lighter`,
                  '&:hover': {
                    bgcolor: `${color}.light`,

                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: `${color}.main`,
                  minWidth: '40px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.25rem'
                  }
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                sx={{
                  flex: '1 1 auto',
                  '& .MuiTypography-root': {
                    fontSize: '0.875rem',
                  }
                }}
              />
              <Badge
                badgeContent={count}
                color={color}
                sx={{
                  
                  '& .MuiBadge-badge': {
                    minWidth: '40px',
                    height: '24px',
                    padding: '0 8px',
                    right: 20,
                    borderRadius: '12px',
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>


    </Drawer>
  );
};

export default Sidebar;