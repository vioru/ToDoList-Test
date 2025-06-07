import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useStore, getUserName } from '../store/todoStore';

const TodoDetail = ({ todo, onClose }) => {
  const users = useStore(state => state.users);
  
  const userName = useMemo(() => 
    getUserName(users, todo.userId),
    [users, todo.userId]
  );

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {todo.title}
      </Typography>
      
      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography color="text.secondary">
            Asignado a: {userName}
          </Typography>
        </Box>

        <Box display="flex" gap={1} mb={2}>
          <Chip
            label={todo.completed ? 'Completada' : 'Pendiente'}
            color={todo.completed ? 'success' : 'warning'}
            size="small"
          />
          {todo.priority && (
            <Chip
              label={`Prioridad: ${todo.priority}`}
              variant="outlined"
              size="small"
            />
          )}
        </Box>

        {todo.category && (
          <Typography color="text.secondary" gutterBottom>
            Categoría: {todo.category}
          </Typography>
        )}
        
        {todo.createdAt && (
          <Typography variant="caption" color="text.secondary" display="block">
            Creada: {new Date(todo.createdAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onClose}>
          Cerrar
        </Button>
      </Box>
    </>
  );
};

TodoDetail.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    category: PropTypes.string,
    priority: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default TodoDetail;