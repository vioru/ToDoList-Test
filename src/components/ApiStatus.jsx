import React from 'react';
import { 
  Alert, 
  AlertTitle, 
  Box, 
  Chip, 
  IconButton, 
  CircularProgress,
  Snackbar
} from '@mui/material';
import { 
  CloudOff, 
  Cloud, 
  Refresh, 
  Close 
} from '@mui/icons-material';

const ApiStatus = ({ 
  loading, 
  error, 
  useMockApi, 
  onToggleApi, 
  onClearError, 
  onRefresh 
}) => {
  return (
    <Box className="mb-4">
      {/* Indicador de modo API */}
      <Box className="flex items-center justify-between mb-2">
        <Chip
          icon={useMockApi ? <CloudOff /> : <Cloud />}
          label={useMockApi ? 'Modo Offline' : 'API Online'}
          color={useMockApi ? 'warning' : 'success'}
          variant="outlined"
          onClick={onToggleApi}
          className="cursor-pointer"
        />
        
        <Box className="flex items-center space-x-2">
          {loading && <CircularProgress size={20} />}
          <IconButton onClick={onRefresh} size="small">
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      {/* Snackbar para errores */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={onClearError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          onClose={onClearError}
          action={
            <IconButton
              size="small"
              onClick={onClearError}
              color="inherit"
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ApiStatus;