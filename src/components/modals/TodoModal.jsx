import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography } from '@mui/material';
import AddTodo from '../NewTodo';
import TodoDetail from '../TodoDetail';

const TodoModal = ({ open, onClose, mode = 'add', todoData = null }) => {
  const getTitleByMode = () => {
    switch (mode) {
      case 'edit':
        return 'Editar Tarea';
      case 'detail':
        return 'Detalles de la Tarea';
      default:
        return 'Nueva Tarea';
    }
  };

  const renderContent = () => {
    switch (mode) {
      case 'detail':
        return <TodoDetail todo={todoData} onClose={onClose} />;
      case 'add':
      case 'edit':
        return (
          <AddTodo 
            editMode={mode === 'edit'}
            todoData={todoData}
            onSubmitSuccess={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-todo"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: 500 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
      }}>
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ mb: 2 }}
        >
          {getTitleByMode()}
        </Typography>

        {renderContent()}
      </Box>
    </Modal>
  );
};

TodoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['add', 'edit', 'detail']),
  todoData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
    priority: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string
  })
};

export default TodoModal;