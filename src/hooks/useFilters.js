import { useStore } from '../store/todoStore';

export const useFilters = () => {
  const {
    filter,
    searchQuery,
    selectedCategory,
    selectedUserId,
    setFilter,
    setSearchQuery,
    setSelectedCategory,
    setSelectedUserId,
    getFilteredTodos
  } = useStore(state => ({
    filter: state.filter,
    searchQuery: state.searchQuery,
    selectedCategory: state.selectedCategory,
    selectedUserId: state.selectedUserId,
    setFilter: state.setFilter,
    setSearchQuery: state.setSearchQuery,
    setSelectedCategory: state.setSelectedCategory,
    setSelectedUserId: state.setSelectedUserId,
    getFilteredTodos: state.getFilteredTodos
  }));

  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedUserId(null);
  };

  return {
    filter,
    searchQuery,
    selectedCategory,
    selectedUserId,
    setFilter,
    setSearchQuery,
    setSelectedCategory,
    setSelectedUserId,
    clearFilters,
    getFilteredTodos
  };
};