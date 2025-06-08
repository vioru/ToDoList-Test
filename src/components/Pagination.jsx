import { Pagination as MuiPagination } from '@mui/material';
import PropTypes from 'prop-types';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center py-4">
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        size="large"
        showFirstButton
        showLastButton
            sx={{
          '& .Mui-selected': {
            backgroundColor: '#906CE5', 
            color: 'white',
            '&:hover': {
              backgroundColor: '#7D40D9', 
            color: 'white',
            }
          },
        }}
        
      />
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;