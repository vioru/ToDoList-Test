import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
  Chip,
  Divider
} from '@mui/material';
import { CloseRounded, Person as PersonIcon } from '@mui/icons-material';
import { useStore, getUserName } from '../store/todoStore';

const TodoDetail = ({ todo, onClose }) => {
  const users = useStore(state => state.users);

  const userName = useMemo(() =>
    getUserName(users, todo.userId),
    [users, todo.userId]
  );

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onClose}>
          <CloseRounded />
        </Button>
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        {todo.title}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ mb: 3 }} display="flex"  justifyContent={"space-between"} alignItems="center">
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <PersonIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <Typography color="text.secondary">
            Asignada a: {userName}
          </Typography>
        </Box>

        <Box  gap={1} mb={2}>
          <Chip
            label={todo.completed ? 'Completada' : 'Pendiente'}
            color={todo.completed ? 'success' : 'warning'}
            size="small"
          />
          
        </Box>

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
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default TodoDetail;