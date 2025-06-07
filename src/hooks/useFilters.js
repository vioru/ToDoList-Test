import { useStore } from '../store/todoStore';

export const useFilters = () => {
  const {
    filter,
    searchQuery,
    selectedUserId,
    setFilter,
    setSearchQuery,
    setSelectedUserId,
    getFilteredTodos
  } = useStore(state => ({
    filter: state.filter,
    searchQuery: state.searchQuery,
    selectedUserId: state.selectedUserId,
    setFilter: state.setFilter,
    setSearchQuery: state.setSearchQuery,
    setSelectedUserId: state.setSelectedUserId,
    getFilteredTodos: state.getFilteredTodos
  }));

  const clearFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setSelectedUserId(null);
  };

  return {
    filter,
    searchQuery,
    selectedUserId,
    setFilter,
    setSearchQuery,
    setSelectedUserId,
    clearFilters,
    getFilteredTodos
  };
};