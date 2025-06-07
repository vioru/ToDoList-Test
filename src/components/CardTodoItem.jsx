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
import TodoModal from './modals/TodoModal';


const CardTodoItem = ({ todo }) => {
  const [modalConfig, setModalConfig] = useState({
    open: false,
    mode: 'detail',
    todoData: null
  });

  const users = useStore(state => state.users);
  const toggleTodo = useStore(state => state.updateTodo);
  const removeTodo = useStore(state => state.removeTodo);

  const userName = useMemo(() =>
    getUserName(users, todo.userId),
    [users, todo.userId]
  );

  const handleToggle = (e) => {
    console.log("estoy en check box", todo.completed);

    toggleTodo(todo.id, {
      completed: !todo.completed
    });
  };

  const handleOpenRemove = async (e) => {
    e.stopPropagation();
    setModalConfig({
      open: true,
      mode: 'delete',
      todoData: todo
    });
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setModalConfig({
      open: true,
      mode: 'edit',
      todoData: todo
    });
  };

  const handleDetailView = () => {
    setModalConfig({
      open: true,
      mode: 'detail',
      todoData: todo
    });
  };

  const closeModal = () => {
    setModalConfig({
      open: false,
      mode: 'detail',
      todoData: null
    });
  };

  return (
    <>
      <MuiCard
        onClick={handleDetailView}
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
              <Checkbox
                checked={todo.completed}
                onChange={handleToggle}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  '&.Mui-checked': {
                    color: 'success.main',
                  }
                }}
              />
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
                onClick={handleOpenRemove}
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


      <TodoModal
        open={modalConfig.open}
        onClose={closeModal}
        mode={modalConfig.mode}
        todoData={modalConfig.todoData}
      />
    </>
  );
};

CardTodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired
};

export default CardTodoItem;