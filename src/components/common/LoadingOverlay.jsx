import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      p={4}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingOverlay;