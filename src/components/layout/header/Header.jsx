import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import SearchBar from '../../filters/searchbar/SearchBar';
import PropTypes from 'prop-types';

const Header = ({ onAddClick }) => {
  return (
    <div className="w-full bg-white py-4 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SearchBar />
          </div>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            className="!bg-primary-300 hover:!bg-primary-500 !rounded-full !normal-case !px-6 !py-2 !text-white"
          >
            Nueva Tarea
          </Button>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

export default Header;
