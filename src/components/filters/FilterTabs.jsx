import { Tabs, Tab } from '@mui/material';
import { useStore } from '../../store/todoStore';

const FilterTabs = () => {
  const filter = useStore(state => state.filter);
  const setFilter = useStore(state => state.setFilter);

  return (
    <Tabs 
      value={filter}
      onChange={(_, newValue) => setFilter(newValue)}
      textColor="inherit"
      sx={{
        '& .MuiTabs-indicator': {
          bgcolor: '#a855f7',
        },
      }}
    >
      <Tab 
        label="Pendientes" 
        value="active"
        sx={{ textTransform: 'none' }}
      />
      <Tab 
        label="Completadas" 
        value="completed"
        sx={{ textTransform: 'none' }}
      />
    </Tabs>
  );
};

export default FilterTabs;