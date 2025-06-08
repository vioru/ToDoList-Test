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
    TextField: ({ label, ...props }) => (
      <input aria-label={label} placeholder={label} {...props} />
    ),
    Select: ({ children, value, onChange, ...props }) => (
      <select role="combobox" value={value} onChange={onChange} {...props}>
        {children}
      </select>
    ),
    MenuItem: ({ children, value, ...props }) => (
      <option value={value} data-testid={value?.toString()} {...props}>
        {children}
      </option>
    ),
    FormControl: ({ children }) => <div>{children}</div>,
    InputLabel: ({ children }) => <label>{children}</label>,
    FormHelperText: ({ children }) => <div>{children}</div>,
    Button: ({ children, onClick, type, ...props }) => (
      <button onClick={onClick} type={type} {...props}>
        {children}
      </button>
    ),
    CircularProgress: ({ size }) => <div data-testid="loading-spinner" style={{ width: size, height: size }} />
  };
});

vi.mock('@mui/icons-material', () => ({
  CloseRounded: () => <span data-testid="close-icon">×</span>
}));

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
        operationLoading: false,
        resetPagination: vi.fn(),
        setFilter: vi.fn(),
        setSelectedUserId: vi.fn(),
        setSearchQuery: vi.fn()
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
      render(<NewTodo onClose={mockOnClose} />);
      
      // Los usuarios aparecen directamente en el select como options
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
      
      const selectElement = screen.getByRole('combobox');
      await user.selectOptions(selectElement, '1');
      
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