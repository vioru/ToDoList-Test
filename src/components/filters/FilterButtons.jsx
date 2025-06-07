import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  ListItemButton,
} from '@mui/material';
import {
  Dashboard,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { useStore } from '../../store/todoStore';

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
  );
};

export default FilterList;