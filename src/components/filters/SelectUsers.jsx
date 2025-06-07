import { Typography, FormControl, Select, MenuItem, Box } from '@mui/material';
import { useStore } from '../../store/todoStore';
import { Person } from '@mui/icons-material';

const SelectUSers = () => {
    const users = useStore(state => state.users);
    const selectedUserId = useStore(state => state.selectedUserId);
    const setSelectedUserId = useStore(state => state.setSelectedUserId);
    const setFilter = useStore(state => state.setFilter);

    return (

        <Box sx={{ p: 3 }}>
            <Typography variant="overline" color="text.primary" gutterBottom sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
                Filtrar por Usuario
            </Typography>
            <FormControl fullWidth size="small">
                <Select
                    value={selectedUserId ?? ''}
                    onChange={e => {
                        const value = e.target.value;
                        setFilter('all');
                        setSelectedUserId(value === '' ? null : Number(value));
                    }}
                    displayEmpty
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderRadius: '25px'
                        }
                    }}
                >
                    <MenuItem value="">Todos los usuarios</MenuItem>
                    {users.map(user => (
                        <MenuItem key={user.id} value={user.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Person fontSize="small" />
                                {user.name}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>

    );
};

export default SelectUSers;