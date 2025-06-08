import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (


    
    <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Cargando tareas...</span>
              <CircularProgress />
      </div>

 
  );
};

export default LoadingOverlay;