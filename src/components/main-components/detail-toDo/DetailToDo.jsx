import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Chip, Divider } from '@mui/material';
import { CloseRounded, Person as PersonIcon } from '@mui/icons-material';
import { useStore, getUserName } from '../../../store/todoStore';

const TodoDetail = ({ todo, onClose }) => {
  const users = useStore(state => state.users);

  const userName = useMemo(() =>
    getUserName(users, todo.userId),
    [users, todo.userId]
  );

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={onClose} className="!min-w-0 !p-1">
          <CloseRounded className=" text-primary-300 hover:bg-primary-100 rounded-full" />
        </Button>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {todo.title}
      </h2>

      <Divider className="!my-4" />

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2 mb-2">
          <PersonIcon fontSize="small" className="text-gray-500" />
          <span className="text-gray-600">
            Asignada a: {userName}
          </span>
        </div>

        <div className="mb-2">
          <Chip
            label={todo.completed ? 'Completada' : 'Pendiente'}
            color={todo.completed ? 'success' : 'warning'}
            size="small"
          />
        </div>
      </div>
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