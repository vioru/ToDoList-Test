import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@mui/material';
import {
  Delete as DeleteIcon,
  DeleteOutline,
  Edit as EditIcon,
  EditOutlined,
  Person as PersonIcon
} from '@mui/icons-material';
import { useStore, getUserName } from '../../../store/todoStore';
import TodoModal from '../../modals/TodoModal';

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
      <div
        onClick={handleDetailView}
        className="bg-white rounded-3xl h-full min-h-[150px] max-h-[200px] flex flex-col relative transition-all duration-300 cursor-pointer hover:-translate-y-1  shadow-lg  border border-gray-100"
      >
        <div className="flex-1 p-4 ">

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Checkbox
                checked={todo.completed}
                onChange={handleToggle}
                onClick={(e) => e.stopPropagation()}
                className="text-green-500"
                sx={{
                  '&.Mui-checked': {
                    color: 'rgb(34 197 94)',
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 
                  className={`text-base font-medium mb-1 line-clamp-2 leading-tight ${
                    todo.completed 
                      ? 'line-through text-gray-500' 
                      : 'text-gray-900'
                  }`}
                >
                  {todo.title}
                </h3>
              </div>
            </div>
            

            <div className="flex gap-1 ml-2">
              <button
                onClick={handleEdit}
                className="p-1.5  hover:bg-primary-100 rounded-full transition-colors"
              >
              <EditOutlined className="w-4 h-4 text-primary-300"/>
        
              </button>
              <button
                onClick={handleOpenRemove}
                className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              >
                <DeleteOutline className="w-4 h-4 text-red-500"/>

              </button>
            </div>
          </div>


          <div className="flex justify-between items-center gap-2 mt-auto">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <PersonIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate max-w-[150px]">
                {userName}
              </span>
            </div>
            
            <span 
              className={`px-3 py-1 rounded-full text-xs font-medium min-w-[90px] text-center ${
                todo.completed 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {todo.completed ? 'Completada' : 'Pendiente'}
            </span>
          </div>
        </div>
      </div>

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