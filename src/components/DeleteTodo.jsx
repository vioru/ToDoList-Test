import PropTypes from 'prop-types';
import { useStore } from '../store/todoStore';
import { CloseRounded } from '@mui/icons-material';

const DeleteTodo = ({ todo, onClose }) => {
  const removeTodo = useStore(state => state.removeTodo);

  const handleDelete = () => {
    removeTodo(todo.id);
  }

  return (
    <>
      <div className="flex justify-end">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <CloseRounded  className=" text-primary-300 hover:bg-primary-100 rounded-full"/>
        </button>
      </div>
      
      <div className="flex justify-center items-center mb-8 flex-col">
        <h2 className="text-xl font-medium mb-4 text-center">
          Esta acción eliminará la tarea
        </h2>
        
        <p className="mb-4 font-medium text-gray-800">
          {todo.title}
        </p>

        <p className="mb-6 text-gray-700">
          ¿Quieres continuar?
        </p>

        <button
          type="submit"
          onClick={handleDelete}
          className=" bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-10 rounded-3xl transition-colors mt-2 normal-case"
        >
          Eliminar tarea
        </button>
      </div>
    </>
  );
};

DeleteTodo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default DeleteTodo;