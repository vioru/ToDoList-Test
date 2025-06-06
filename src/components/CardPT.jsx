import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Box,
  Checkbox,
  IconButton,
  Chip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useStore, getUserName } from '../store/todoStore';
import AddTodoModal from './modals/AddTodoModal';
import TodoDetailModal from './modals/TodoDetailModal';

const CardPT = ({ todo }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const users = useStore(state => state.users);
  const toggleTodo = useStore(state => state.toggleTodo);
  const removeTodo = useStore(state => state.removeTodo);

  const userName = useMemo(() => 
    getUserName(users, todo.userId), 
    [users, todo.userId]
  );

  const handleEdit = (e) => {
    e.stopPropagation(); 
    setIsEditModalOpen(true);
  };

  return (
    <>
      <MuiCard
        onClick={() => setIsDetailModalOpen(true)}
        sx={{
          borderRadius: 5,
          height: '100%',
          minHeight: 150,
          maxHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: (theme) => theme.shadows[4]
          }
        }}
      >
        <CardContent sx={{ flex: 1, p: 2 }}>
          <Box display="flex" alignItems="flex-start" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1} flex={1}>
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  sx={{
                    '&.Mui-checked': {
                      color: 'success.main',
                    }
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                    fontSize: '1rem',
                    fontWeight: 500,
                    mb: 0.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.2,
                  }}
                >
                  {todo.title}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" gap={1}>
              <IconButton
                size="small"
                onClick={handleEdit}
                sx={{ color: 'primary.main' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation(); 
                  removeTodo(todo.id);
                }}
                sx={{ color: 'error.main' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" width="100%" gap={1}>
            <Box display="flex" alignItems="center" gap={1}>
              <PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{
                  maxWidth: 150,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {userName}
              </Typography>
            </Box>
            <Chip
              label={todo.completed ? 'Completada' : 'Pendiente'}
              size="small"
              color={todo.completed ? 'success' : 'warning'}
              sx={{ height: 24, minWidth: 90 }}
            />
          </Box>
        </CardContent>
      </MuiCard>

      {/* Modal de detalles de la tarea*/}
      <TodoDetailModal
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        todo={todo}
      />

      {/* Modal de edición */}
      <AddTodoModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        editMode={true}
        todoData={todo}
      />
    </>
  );
};

CardPT.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    category: PropTypes.string,
    priority: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired
};

export default CardPT;