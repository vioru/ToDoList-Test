import PropTypes from 'prop-types';
import { Modal, Box, Typography } from '@mui/material';
import TodoDetail from '../TodoDetail';
import DeleteTodo from '../DeleteTodo';
import NewTodo from '../NewTodo';

const TodoModal = ({ open, onClose, mode = 'add', todoData = null }) => {


  const renderContent = () => {
    switch (mode) {
      case 'detail':
        return <TodoDetail todo={todoData} onClose={onClose} />;
      case 'add':
      case 'edit':
        return (
          <NewTodo
            editMode={mode === 'edit'}
            todoData={todoData}
            onSubmitSuccess={onClose}
            onClose={onClose}
          />
        );
        case 'delete':
        return <DeleteTodo todo={todoData} onClose={onClose} />;
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
        borderRadius: 6,
        boxShadow: 24,
        p: 4,
      }}>


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
  })
};

export default TodoModal;