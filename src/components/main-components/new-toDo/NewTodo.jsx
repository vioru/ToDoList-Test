import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText, 
} from '@mui/material';
import { useStore } from '../../../store/todoStore';
import { CloseRounded } from '@mui/icons-material';

const schema = yup.object({
  text: yup
    .string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no debe exceder los 200 caracteres'),
  userId: yup
    .number()
    .transform((value, originalValue) => originalValue === '' ? null : value)
    .nullable()
    .required('El usuario es obligatorio'),
}).required();

const NewTodo = ({ editMode = false, todoData = null, onSubmitSuccess, onClose }) => {
  const users = useStore(state => state.users);
  const addTodo = useStore(state => state.addTodo);
  const updateTodo = useStore(state => state.updateTodo);
  const operationLoading = useStore(state => state.operationLoading);
  const resetPagination = useStore(state => state.resetPagination);
  const setFilter = useStore(state => state.setFilter);
  const setSelectedUserId = useStore(state => state.setSelectedUserId);
  const setSearchQuery = useStore(state => state.setSearchQuery);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: '',
      userId: '',
    }
  });

  const currentUserId = watch('userId');

  useEffect(() => {
    if (editMode && todoData) {
      setValue('text', todoData.title);
      setValue('userId', Number(todoData.userId));
    }
  }, [editMode, todoData, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (editMode && todoData) {
        await updateTodo(todoData.id, {
          title: data.text,
          userId: Number(data.userId),
          updatedAt: new Date().toISOString()
        });
      } else {
        await addTodo({
          title: data.text,
          userId: Number(data.userId),
          completed: false,
          createdAt: new Date().toISOString()
        });
      }

      reset();
      resetPagination();
      setFilter("all")
      setSelectedUserId(null);
      setSearchQuery('');
      if (onSubmitSuccess) {
        setTimeout(() => {
          onSubmitSuccess();
        }, 100);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
     };

  const isLoading = isSubmitting || operationLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {editMode ? 'Editar Tarea' : 'Nueva Tarea'}
        </h2>
        <Button onClick={onClose} className="!min-w-0 !p-1">
          <CloseRounded  className=" text-primary-300 hover:bg-primary-100 rounded-full"/>
        </Button>
      </div>
      
      <TextField
        {...register('text')}
        label="Título de la tarea"
        error={!!errors.text}
        helperText={errors.text?.message}
        fullWidth
        disabled={isLoading}
        InputProps={{
          sx: { borderRadius: 4 }
        }}
      />

      <FormControl fullWidth error={!!errors.userId}>
        <InputLabel>Asignar a</InputLabel>
        <Select
          data-testid="user-select"
          {...register('userId')}
          label="Asignar a"
          disabled={isLoading}
          value={currentUserId || ''}
          sx={{ borderRadius: 4 }}
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id} data-testid={`${user.id}`}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
        {errors.userId && (
          <FormHelperText>{errors.userId.message}</FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={20} /> : null}
        className="!mt-4 !rounded-3xl !normal-case !bg-purple-500 hover:!bg-purple-600"
      >
        {isLoading
          ? 'Guardando...'
          : editMode ? 'Guardar Cambios' : 'Crear nueva tarea'
        }
      </Button>
    </form>
  );
};

NewTodo.propTypes = {
  editMode: PropTypes.bool,
  todoData: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
  onClose: PropTypes.func.isRequired
};

export default NewTodo;