import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from '../../store/todoStore';

const SearchBar = () => {
  const setSearchQuery = useStore(state => state.setSearchQuery);

  return (
    <div className="w-full [&_.MuiOutlinedInput-root]:rounded-full ">
      <TextField
      fullWidth
      placeholder="Buscar tareas..."
      variant="outlined"
      size="large"
      onChange={(e) => setSearchQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />

    </div>
    
  );
};

export default SearchBar;