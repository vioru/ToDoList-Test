import { useState, useEffect } from 'react';
import { todoService } from '../services/toDoService';
import { mockTodoService } from '../services/mockService';
import { useStore } from '../store/todoStore';

export const useTodos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useMockApi, setUseMockApi] = useState(false);
  
  const { 
    addTodo: addTodoToStore, 
    removeTodo, 
    toggleTodo: toggleTodoInStore,
    updateTodo: updateTodoInStore 
  } = useStore();
  

  const getService = () => useMockApi ? mockTodoService : todoService;
  

  const handleError = (error) => {
    console.error('Todo operation failed:', error);
    setError(error.message || 'An error occurred');
    

    if (!useMockApi && error.message.includes('Network Error')) {
      setUseMockApi(true);
      setError('Using offline mode due to network issues');
    }
  };


  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const service = getService();
      const todosData = await service.getAllTodos();
      console.log('Todos fetched:', todosData);
      
      const transformedTodos = todosData.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        userId: todo.userId
      }));

      useStore.setState({ todos: transformedTodos });
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  
  const createTodo = async (todoData) => {
    setLoading(true);
    setError(null);
    
    try {
      const service = getService();
      const newTodo = await service.createTodo(todoData);
      addTodoToStore(newTodo);
      return newTodo;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const updateTodo = async (id, todoData) => {
    setLoading(true);
    setError(null);
    
    try {
      const service = getService();
      const updatedTodo = await service.updateTodo(id, todoData);
      return updatedTodo;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const service = getService();
      await service.deleteTodo(id);
      removeTodo(id);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const toggleTodo = async (id, completed) => {
    setLoading(true);
    setError(null);
    
    try {
      const service = getService();
      await service.toggleTodo(id, completed);
      toggleTodoInStore(id);
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };


  const toggleApiMode = () => {
    setUseMockApi(!useMockApi);
    setError(null);
  };

  const clearError = () => setError(null);

  return {
    loading,
    error,
    useMockApi,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    toggleApiMode,
    clearError
  };
};