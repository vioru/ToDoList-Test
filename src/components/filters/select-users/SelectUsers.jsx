import { FormControl, Select, MenuItem } from '@mui/material';
import { useStore } from '../../../store/todoStore';
import { Person } from '@mui/icons-material';

const SelectUsers = () => {
    const users = useStore(state => state.users);
    const selectedUserId = useStore(state => state.selectedUserId);
    const setSelectedUserId = useStore(state => state.setSelectedUserId);
    const setFilter = useStore(state => state.setFilter);

    return (
        <div className="p-6 ">
            <h3 className="text-base font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Filtrar por Usuario
            </h3>
            
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
                    <MenuItem value="">
                        <span className="text-gray-600">Todos los usuarios</span>
                    </MenuItem>
                    {users.map(user => (
                        <MenuItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-2">
                                <Person fontSize="small" className="text-gray-500" />
                                <span className="text-gray-800">{user.name}</span>
                            </div>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectUsers;