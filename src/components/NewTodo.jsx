import  { useEffect, useState } from 'react';
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
  Box,
  Typography
} from '@mui/material';
import { useStore } from '../store/todoStore';
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

const NewTodo = ({ editMode = false, todoData = null, onSubmitSuccess , onClose}) => {
  const users = useStore(state => state.users);
  const addTodo = useStore(state => state.addTodo);
  const updateTodo = useStore(state => state.updateTodo);
  const operationLoading = useStore(state => state.operationLoading); 
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
      <Box display="flex" justifyContent={"space-between"} alignItems="center" mb={2}>
        <Typography
          variant="h6" 
          component="h2" 
          sx={{ mb: 2 }}
        >
          {editMode ? 'Editar Tarea' : 'Nueva Tarea'}
        </Typography>
        <Button onClick={onClose}>
          <CloseRounded />
        </Button>
      </Box>
      
      <TextField
        {...register('text')}
        label="Título de la tarea"
        error={!!errors.text}
        helperText={errors.text?.message}
        fullWidth
        disabled={isLoading}
        InputProps={{
          sx: {
            borderRadius: 4,
          }
        }}
      />

      <FormControl fullWidth error={!!errors.userId}>
        <InputLabel>Asignar a</InputLabel>
        <Select
          {...register('userId')}
          label="Asignar a"
          disabled={isLoading}
          value={currentUserId || ''}
          sx={{ borderRadius: 4, }}
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
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
        sx={{ mt: 2, borderRadius: 6, textTransform: 'none', }}
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