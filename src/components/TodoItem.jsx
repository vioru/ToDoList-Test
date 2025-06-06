import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useStore } from '../store/todoStore';
import AddTodoModal from './modals/AddTodoModal';

const TodoItem = ({ todo }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleTodo = useStore(state => state.toggleTodo);
  const removeTodo = useStore(state => state.removeTodo);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card className="bg-white shadow-sm hover:shadow-md transition-shadow my-4">
        <CardContent className="flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <Typography 
              className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
            >
              {todo.title }
            </Typography>
            {todo.userId && (
              <Typography variant="caption" className="text-gray-500">
                Asignado a: {useStore.getState().getUserName(todo.userId)}
              </Typography>
            )}
          </div>
          <div className="flex gap-2">
            <IconButton 
              onClick={handleEdit}
              size="small"
              className="text-blue-400 hover:text-blue-600"
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              onClick={() => removeTodo(todo.id)}
              size="small"
              className="text-gray-400 hover:text-red-500"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>

      <AddTodoModal 
        open={isEditModalOpen}
        onClose={handleCloseModal}
        editMode={true}
        todoData={todo}
      />
    </>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    text: PropTypes.string,
    completed: PropTypes.bool.isRequired,
    userId: PropTypes.number,
    priority: PropTypes.string
  }).isRequired
};

export default TodoItem;