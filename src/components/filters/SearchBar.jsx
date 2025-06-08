import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useStore } from '../../store/todoStore';
import { useState } from 'react';

const SearchBar = () => {
  const searchQuery = useStore(state => state.searchQuery);
  const setSearchQuery = useStore(state => state.setSearchQuery);
  const [localValue, setLocalValue] = useState(searchQuery || '');

  const handleChange = (e) => {
    const value = e.target.value;
    setLocalValue(value);
    setSearchQuery(value);
  };

  const handleClear = () => {
    setLocalValue('');
    setSearchQuery('');
  };

  return (
    <div className="w-full [&_.MuiOutlinedInput-root]:rounded-full">
      <TextField
        fullWidth
        placeholder="Buscar tareas..."
        variant="outlined"
        size="small"
        value={localValue}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-500" />
            </InputAdornment>
          ),
          endAdornment: localValue && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon className="text-gray-400" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;