import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography } from '@mui/material';
import AddTodo from '../AddTodo';

const AddTodoModal = ({ open, onClose, editMode = false, todoData = null }) => {
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
          {editMode ? 'Editar Tarea' : 'Nueva Tarea'}
        </Typography>

        <AddTodo 
          editMode={editMode}
          todoData={todoData}
          onSubmitSuccess={onClose}
        />
      </Box>
    </Modal>
  );
};

AddTodoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  todoData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
    priority: PropTypes.string
  })
};

export default AddTodoModal;