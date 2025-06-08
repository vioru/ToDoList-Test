import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NewTodo from './NewTodo';
import { useStore } from '../../../store/todoStore';


vi.mock('../../../store/todoStore', () => ({
  useStore: vi.fn()
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    CircularProgress: ({ size }) => <div data-testid="loading-spinner" style={{ width: size, height: size }} />
  };
});

describe('NewTodo Component', () => {
  const mockUsers = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'Ana García' },
    { id: 3, name: 'Carlos López' }
  ];

  const mockAddTodo = vi.fn();
  const mockUpdateTodo = vi.fn();
  const mockOnSubmitSuccess = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    

    useStore.mockImplementation((selector) => {
      const mockState = {
        users: mockUsers,
        addTodo: mockAddTodo,
        updateTodo: mockUpdateTodo,
        operationLoading: false
      };
      
      if (typeof selector === 'function') {
        return selector(mockState);
      }
      
      return mockState;
    });
  });

  describe('Rendering', () => {
    it('debria mostrar el titulo correcto cuando es una nueva tarea', () => {
      render(<NewTodo onClose={mockOnClose} />);
      
      expect(screen.getByText('Nueva Tarea')).toBeInTheDocument();
      expect(screen.getByLabelText('Título de la tarea')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /crear nueva tarea/i })).toBeInTheDocument();
    });

    it('should render the edit todo form with correct title when in edit mode', () => {
      const todoData = {
        id: 1,
        title: 'Test todo',
        userId: 1
      };

      render(
        <NewTodo 
          editMode={true} 
          todoData={todoData} 
          onClose={mockOnClose} 
          onSubmitSuccess={mockOnSubmitSuccess}
        />
      );
      
      expect(screen.getByText('Editar Tarea')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /guardar cambios/i })).toBeInTheDocument();
    });

    it('deberia mostra a todos los usuarios en el select', async () => {
      const user = userEvent.setup();
      render(<NewTodo onClose={mockOnClose} />);
      

      const selectButton = screen.getByRole('combobox');
      await user.click(selectButton);
      
      for (const mockUser of mockUsers) {
        expect(screen.getByTestId(mockUser.id.toString())).toBeInTheDocument();
        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      }
    });

  });



  describe('formulario-nueva tarea', () => {
    it('debería crear una nueva tarea cuando los datos son correctos', async () => {
      const user = userEvent.setup();
      mockAddTodo.mockResolvedValueOnce({});
      
      render(<NewTodo onClose={mockOnClose} onSubmitSuccess={mockOnSubmitSuccess} />);
      
      const titleInput = screen.getByLabelText('Título de la tarea');
      await user.type(titleInput, 'Nueva tarea ');
      

      const selectButton = screen.getByRole('combobox');
      await user.click(selectButton);
      
      const userOption = screen.getByTestId('1');
      await user.click(userOption);
      
      const submitButton = screen.getByRole('button', { name: /crear nueva tarea/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockAddTodo).toHaveBeenCalledWith({
          title: 'Nueva tarea ',
          userId: 1,
          completed: false,
          createdAt: expect.any(String)
        });
      });
      
      await waitFor(() => {
        expect(mockOnSubmitSuccess).toHaveBeenCalled();
      });
    });

  });

  describe('formulario-editar tarea', () => {
    it('debería actualizar la tarea cuando los datos son correctos', async () => {
      const user = userEvent.setup();
      const todoData = {
        id: 1,
        title: 'Original title',
        userId: 1
      };
      
      mockUpdateTodo.mockResolvedValueOnce({});
      
      render(
        <NewTodo 
          editMode={true} 
          todoData={todoData} 
          onClose={mockOnClose} 
          onSubmitSuccess={mockOnSubmitSuccess}
        />
      );
      
      const titleInput = screen.getByLabelText('Título de la tarea');
      await user.clear(titleInput);
      await user.type(titleInput, 'Actualizar titulo');
      
      const submitButton = screen.getByRole('button', { name: /guardar cambios/i });
      await user.click(submitButton);
      
      await waitFor(() => {
        expect(mockUpdateTodo).toHaveBeenCalledWith(1, {
          title: 'Actualizar titulo',
          userId: 1,
          updatedAt: expect.any(String)
        });
      });
      
      await waitFor(() => {
        expect(mockOnSubmitSuccess).toHaveBeenCalled();
      });
    });
  });

});