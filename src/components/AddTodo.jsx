import React, { useEffect, useState } from 'react';
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
  CircularProgress 
} from '@mui/material';
import { useStore } from '../store/todoStore';

const schema = yup.object({
  text: yup.string().required('El título es obligatorio'),
  userId: yup.number().required('El usuario es obligatorio'),
  priority: yup.string().oneOf(['high', 'medium', 'low']).required()
}).required();

const AddTodo = ({ editMode = false, todoData = null, onSubmitSuccess }) => {
  const users = useStore(state => state.users);
  const addTodo = useStore(state => state.addTodo);
  const updateTodo = useStore(state => state.updateTodo);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      text: '',
      userId: '',
      priority: 'medium'
    }
  });

  
  const currentUserId = watch('userId');

  useEffect(() => {
    if (editMode && todoData) {
      setValue('text', todoData.title || todoData.text);
      setValue('userId', Number(todoData.userId));
      setValue('priority', todoData.priority || 'medium');
    }
  }, [editMode, todoData, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (editMode && todoData) {
        await updateTodo(todoData.id, {
          title: data.text,
          userId: Number(data.userId),      
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
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        {...register('text')}
        label="Título de la tarea"
        error={!!errors.text}
        helperText={errors.text?.message}
        fullWidth
        disabled={isSubmitting}
      />

      <FormControl fullWidth error={!!errors.userId}>
        <InputLabel>Asignar a</InputLabel>
        <Select
          {...register('userId')}
          label="Asignar a"
          disabled={isSubmitting}
          value={currentUserId || ''} 
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
      >
        {isSubmitting 
          ? 'Guardando...' 
          : editMode ? 'Guardar Cambios' : 'Crear Tarea'
        }
      </Button>
    </form>
  );
};

AddTodo.propTypes = {
  editMode: PropTypes.bool,
  todoData: PropTypes.object,
  onSubmitSuccess: PropTypes.func
};

export default AddTodo;