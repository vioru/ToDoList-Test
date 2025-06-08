import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DeleteTodo from './DeleteTodo';
import { useStore } from '../../../store/todoStore';


vi.mock('../../../store/todoStore', () => ({
  useStore: vi.fn()
}));

describe('DeleteTodo Component', () => {
  const mockRemoveTodo = vi.fn();
  const mockOnClose = vi.fn();
  
  const mockTodo = {
    id: 1,
    title: 'Tarea de prueba'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    useStore.mockImplementation((selector) => {
      const mockState = {
        removeTodo: mockRemoveTodo
      };
      
      if (typeof selector === 'function') {
        return selector(mockState);
      }
      
      return mockState;
    });
  });

  it('deberia mostrar la confirmación y el nombre de la tarea a eliminar', () => {
    render(<DeleteTodo todo={mockTodo} onClose={mockOnClose} />);
    
    expect(screen.getByText('Esta acción eliminará la tarea')).toBeInTheDocument();
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByText('¿Quieres continuar?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Eliminar tarea' })).toBeInTheDocument();
  });

  it('deberia llamar a la funcion con el id correspondiente ', async () => {
    const user = userEvent.setup();
    render(<DeleteTodo todo={mockTodo} onClose={mockOnClose} />);
    
    const deleteButton = screen.getByRole('button', { name: 'Eliminar tarea' });
    await user.click(deleteButton);
    
    expect(mockRemoveTodo).toHaveBeenCalledWith(1);
    expect(mockRemoveTodo).toHaveBeenCalledTimes(1);
  });

});