import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewTodo from './NewTodo';
import { useStore } from '../../../store/todoStore';

vi.mock('../../../store/todoStore');

// Usuarios simulados
const mockUsers = [
  { id: 1, name: 'Usuario 1' },
  { id: 2, name: 'Usuario 2' },
];

const mockStoreState = {
  users: mockUsers,
  addTodo: vi.fn(),
  updateTodo: vi.fn(),
  operationLoading: false,
};

beforeEach(() => {
  vi.clearAllMocks();
  useStore.mockImplementation(selector => selector(mockStoreState));
});

describe('NewTodo tests básicos', () => {
  it('crea una nueva tarea correctamente', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    render(<NewTodo onClose={mockOnClose} />);

    // Escribir título
    const tituloInput = screen.getByLabelText(/título de la tarea/i);
    await user.type(tituloInput, 'Tarea de prueba');

    // Seleccionar usuario
    const select = screen.getByTestId('user-select');
    await user.click(select);
    
    // Esperar a que aparezca la opción y hacer click
    const userOption = await screen.findByTestId('1');
    await user.click(userOption);

    // Enviar formulario
    const crearBtn = screen.getByRole('button', { name: /crear nueva tarea/i });
    await user.click(crearBtn);

    // Esperar a que se complete la operación
    await waitFor(() => {
      expect(mockStoreState.addTodo).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Tarea de prueba',
          userId: 1,
          completed: false,
          createdAt: expect.any(String),
        })
      );
    });
  });

  it('valida que se seleccione un usuario', async () => {
    const user = userEvent.setup();
    const mockOnClose = vi.fn();
    render(<NewTodo onClose={mockOnClose} />);

    // Solo escribir título sin seleccionar usuario
    const tituloInput = screen.getByLabelText(/título de la tarea/i);
    await user.type(tituloInput, 'Tarea de prueba');

    // Enviar formulario
    const crearBtn = screen.getByRole('button', { name: /crear nueva tarea/i });
    await user.click(crearBtn);

    // Verificar que aparece el error de validación
    await waitFor(() => {
      expect(screen.getByText('El usuario es obligatorio')).toBeInTheDocument();
    });

    // Verificar que no se llamó addTodo
    expect(mockStoreState.addTodo).not.toHaveBeenCalled();
  });
});

//   it('edita una tarea existente correctamente', async () => {
//     const user = userEvent.setup();
//     const mockOnClose = vi.fn();
//     const todoData = { id: 123, title: 'Tarea vieja', userId: 1, completed: false };

//     render(<NewTodo editMode todoData={todoData} onClose={mockOnClose} />);

//     const inputTitulo = screen.getByDisplayValue('Tarea vieja');
//     await user.clear(inputTitulo);
//     await user.type(inputTitulo, 'Tarea editada');

//     const btnGuardar = screen.getByRole('button', { name: /guardar cambios/i });
//     await user.click(btnGuardar);

//     expect(mockStoreState.updateTodo).toHaveBeenCalledWith(
//       123,
//       expect.objectContaining({
//         title: 'Tarea editada',
//         userId: 1,
//         updatedAt: expect.any(String)
//       })
//     );
//   });

//   it('deshabilita inputs y botón mientras carga', () => {
//     useStore.mockReturnValue({
//       ...mockStoreState,
//       operationLoading: true
//     });
//     const mockOnClose = vi.fn();

//     render(<NewTodo onClose={mockOnClose} />);

//     const inputTitulo = screen.getByLabelText(/título de la tarea/i);
//     const selectUsuario = screen.getByLabelText(/asignar a/i);
//     const btn = screen.getByRole('button');

//     expect(inputTitulo).toBeDisabled();
//     expect(selectUsuario).toBeDisabled();
//     expect(btn).toBeDisabled();
//   });

