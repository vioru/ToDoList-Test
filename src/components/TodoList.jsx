import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useStore } from '../store/todoStore';
import CardPT from './CardPT';
import Pagination from './Pagination';

const TodoList = () => {
  const todos = useStore((state) => state.todos || []);
  const filter = useStore((state) => state.filter);
  const searchQuery = useStore((state) => state.searchQuery || '');
  const selectedCategory = useStore((state) => state.selectedCategory);
  const selectedUserId = useStore((state) => state.selectedUserId);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const filteredTodos = todos.filter((todo) => {

    const matchesSearch = !searchQuery || searchQuery.trim() === '' ||

      todo.title?.toLowerCase().includes(searchQuery.toLowerCase());


    const matchesCategory = !selectedCategory || selectedCategory === 'all' || todo.category === selectedCategory;


    const matchesUser = !selectedUserId || todo.userId === selectedUserId;


    let matchesFilter = true;
    if (filter === 'completed') matchesFilter = todo.completed;
    if (filter === 'active') matchesFilter = !todo.completed;

    return matchesSearch && matchesCategory && matchesUser && matchesFilter;
  });



  useEffect(() => {
    setCurrentPage(1);
  }, [selectedUserId]);


  const setFilter = useStore((state) => state.setFilter);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);

  useEffect(() => {
    if (selectedUserId) {
      setFilter('all');
      setSelectedCategory('all');
    }
  }, [selectedUserId, setFilter, setSelectedCategory]);

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