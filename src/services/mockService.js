// Mock service para simular API cuando no hay conexión
class MockTodoService {
  constructor() {
    this.todos = this.getStoredTodos();
    this.nextId = Math.max(...this.todos.map(t => t.id), 0) + 1;
  }

  // Obtener todos del localStorage
  getStoredTodos() {
    const stored = localStorage.getItem('mock-todos');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Datos iniciales si no hay nada en localStorage
    return [
      {
        id: 1,
        text: "Completar proyecto de React",
        completed: false,
        priority: "high",
        dueTime: "09:00 AM",
        comments: 2,
        userId: 1
      },
      {
        id: 2,
        text: "Revisar documentación",
        completed: true,
        priority: "medium",
        dueTime: "02:30 PM",
        comments: 0,
        userId: 1
      },
      {
        id: 3,
        text: "Preparar presentación",
        completed: false,
        priority: "low",
        dueTime: "04:00 PM",
        comments: 1,
        userId: 1
      }
    ];
  }

  // Guardar todos en localStorage
  saveTodos() {
    localStorage.setItem('mock-todos', JSON.stringify(this.todos));
  }

  // Simular delay de red
  async simulateDelay() {
    const delay = Math.random() * 500 + 200; // 200-700ms
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Simular error ocasional
  simulateError() {
    if (Math.random() < 0.1) { // 10% chance de error
      throw new Error('Simulated network error');
    }
  }

  async getAllTodos() {
    await this.simulateDelay();
    this.simulateError();
    return [...this.todos];
  }

  async getTodoById(id) {
    await this.simulateDelay();
    this.simulateError();
    
    const todo = this.todos.find(t => t.id === parseInt(id));
    if (!todo) {
      throw new Error('Todo not found');
    }
    return { ...todo };
  }

  async createTodo(todoData) {
    await this.simulateDelay();
    this.simulateError();
    
    const newTodo = {
      id: this.nextId++,
      text: todoData.text,
      completed: todoData.completed || false,
      priority: todoData.priority || 'medium',
      dueTime: todoData.dueTime || '08:30 PM',
      comments: todoData.comments || 0,
      userId: 1
    };
    
    this.todos.push(newTodo);
    this.saveTodos();
    return { ...newTodo };
  }

  async updateTodo(id, todoData) {
    await this.simulateDelay();
    this.simulateError();
    
    const index = this.todos.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      throw new Error('Todo not found');
    }
    
    this.todos[index] = {
      ...this.todos[index],
      ...todoData,
      id: parseInt(id)
    };
    
    this.saveTodos();
    return { ...this.todos[index] };
  }

  async deleteTodo(id) {
    await this.simulateDelay();
    this.simulateError();
    
    const index = this.todos.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
      throw new Error('Todo not found');
    }
    
    this.todos.splice(index, 1);
    this.saveTodos();
    return { success: true };
  }

  async toggleTodo(id, completed) {
    await this.simulateDelay();
    this.simulateError();
    
    const todo = this.todos.find(t => t.id === parseInt(id));
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    todo.completed = completed;
    this.saveTodos();
    return { id: todo.id, completed: todo.completed };
  }
}

export const mockTodoService = new MockTodoService();