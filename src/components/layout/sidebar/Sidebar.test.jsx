import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Sidebar from './Sidebar';
import { useStore } from '../../../store/todoStore';

vi.mock('../../../store/todoStore', () => ({
  useStore: vi.fn()
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    Drawer: ({ children, ...props }) => <div data-testid="sidebar-drawer" {...props}>{children}</div>,
    Divider: () => <hr data-testid="divider" />,
    Button: ({ children, onClick, ...props }) => (
      <button onClick={onClick} data-testid="clear-filters-button" {...props}>
        {children}
      </button>
    )
  };
});

vi.mock('@mui/icons-material', () => ({
  TrackChanges: () => <span data-testid="track-changes-icon">🔄</span>
}));

vi.mock('../../filters/filter-buttons/FilterButtons', () => ({
  default: () => <div data-testid="filter-buttons">Filter Buttons Component</div>
}));

vi.mock('../../filters/select-users/SelectUsers', () => ({
  default: () => <div data-testid="select-users">Select Users Component</div>
}));

describe('Sidebar Component', () => {
  const mockSetFilter = vi.fn();
  const mockSetSelectedUserId = vi.fn();
  const mockSetSearchQuery = vi.fn();
  const mockOnToggleApi = vi.fn();

  const mockUsers = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'Ana García' },
    { id: 3, name: 'Carlos López' }
  ];

  const mockTodos = [
    { id: 1, title: 'Todo 1', userId: 1, completed: true },
    { id: 2, title: 'Todo 2', userId: 1, completed: false },
    { id: 3, title: 'Todo 3', userId: 2, completed: true },
    { id: 4, title: 'Todo 4', userId: 2, completed: false }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    useStore.mockImplementation((selector) => {
      const mockState = {
        todos: mockTodos,
        setFilter: mockSetFilter,
        users: mockUsers,
        selectedUserId: null,
        setSelectedUserId: mockSetSelectedUserId,
        setSearchQuery: mockSetSearchQuery
      };
      
      if (typeof selector === 'function') {
        return selector(mockState);
      }
      
      return mockState;
    });
  });

  it('deberia renderizar el side bar con todas sus funcionalidades y/o elementos', () => {
    render(<Sidebar onToggleApi={mockOnToggleApi} />);

    expect(screen.getByTestId('sidebar-drawer')).toBeInTheDocument();
    expect(screen.getByText('Task Flow')).toBeInTheDocument();
    expect(screen.getByText('Borrar filtros')).toBeInTheDocument();
    expect(screen.getByText('Resumen de Tareas')).toBeInTheDocument();
    
    expect(screen.getByTestId('filter-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('select-users')).toBeInTheDocument();
    expect(screen.getAllByTestId('divider')).toHaveLength(2);
  });


  it('deberia mostrar la cantidad de tareas finalizadas o pendientes filtrando por usuaro', () => {
    useStore.mockImplementation((selector) => {
      const mockState = {
        todos: mockTodos,
        setFilter: mockSetFilter,
        users: mockUsers,
        selectedUserId: 1,
        setSelectedUserId: mockSetSelectedUserId,
        setSearchQuery: mockSetSearchQuery
      };
      
      if (typeof selector === 'function') {
        return selector(mockState);
      }
      
      return mockState;
    });
    
    render(<Sidebar onToggleApi={mockOnToggleApi} />);
    
    expect(screen.getByText('Usuario: Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('Finalizadas: 1')).toBeInTheDocument();
    expect(screen.getByText('Pendientes: 1')).toBeInTheDocument();
  });

  it('deberia limpiar los filtros aplicados cuando se de click en limpiar filtros', async () => {
    const user = userEvent.setup();
    render(<Sidebar onToggleApi={mockOnToggleApi} />);
    
    const clearButton = screen.getByTestId('clear-filters-button');
    await user.click(clearButton);
    
    expect(mockSetFilter).toHaveBeenCalledWith('all');
    expect(mockSetSelectedUserId).toHaveBeenCalledWith(null);
    expect(mockSetSearchQuery).toHaveBeenCalledWith('');
  });
});