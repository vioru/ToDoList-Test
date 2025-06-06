import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import SearchBar from '../filters/SearchBar';

const Header = ({ onAddClick }) => {
  return (
    <div className="w-full bg-white text-white py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">

          <div className="flex-1">
            <SearchBar />
          </div>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{
              bgcolor: '#a855f7',
              '&:hover': { bgcolor: '#9333ea' },
              borderRadius: '9999px',
              textTransform: 'none',
              px: 4,
              py: 2,
            }}
          >
            Nueva Tarea
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
