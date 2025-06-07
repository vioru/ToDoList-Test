import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { useStore } from '../store/todoStore';
import { CloseRounded } from '@mui/icons-material';

const DeleteTodo = ({ todo, onClose }) => {
  const removeTodo = useStore(state => state.removeTodo);

  const handleDelete = () => {
    removeTodo(todo.id);
  }

  return (
    <>
      <Box display="flex" justifyContent="flex-end">

        <Button onClick={onClose}>
          <CloseRounded />
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2} flexDirection={'column'}>
        <Typography variant="h6" component="h2" gutterBottom textAlign={'center'}>
          Esta acción eliminará la tarea
        </Typography>
        <Typography variant="p" component="h2"  gutterBottom>
          {todo.title}
        </Typography>

        <Typography variant="p" component="h2" gutterBottom>
          ¿Quieres continuar?
        </Typography>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color='error'
          sx={{ mt: 2, borderRadius: 6 , textTransform: 'none', }}
          disabled={false}
          onClick={handleDelete}
        >
          Eliminar tarea
        </Button>

      </Box>



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