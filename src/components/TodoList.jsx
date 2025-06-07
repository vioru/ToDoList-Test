import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useStore } from '../store/todoStore';
import CardPT from './CardTodoItem';
import Pagination from './Pagination';

const TodoList = () => {
  const getFilteredTodos = useStore((state) => state.getFilteredTodos);
  const selectedUserId = useStore((state) => state.selectedUserId);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredTodos = getFilteredTodos();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedUserId]);

  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (filteredTodos.length === 0) {
    return (
      <Box p={3} textAlign="center">
        <Typography color="textSecondary">
          {selectedUserId ? 'No tasks found for this user' : 'No tasks found'}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentTodos.map((todo) => (
            <div
              key={todo.id}
              className="h-full transition-all hover:-translate-y-1 duration-200"
            >
              <CardPT todo={todo} />
            </div>
          ))}
        </div>

        {filteredTodos.length > itemsPerPage && (
          <Pagination
            totalItems={filteredTodos.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default TodoList;