export const mockMuiMaterial = {
  Drawer: ({ children, ...props }) => <div data-testid="mui-drawer" {...props}>{children}</div>,
  Divider: () => <hr data-testid="mui-divider" />,
  Button: ({ children, onClick, ...props }) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
  TextField: ({ label, ...props }) => (
    <input aria-label={label} placeholder={label} {...props} />
  ),
  Select: ({ children, ...props }) => (
    <select role="combobox" {...props}>{children}</select>
  ),
  MenuItem: ({ children, value, ...props }) => (
    <option value={value} data-testid={value} {...props}>{children}</option>
  ),
  FormControl: ({ children }) => <div>{children}</div>,
  InputLabel: ({ children }) => <label>{children}</label>,
  CircularProgress: ({ size = 20 }) => (
    <div data-testid="loading-spinner" style={{ width: size, height: size }} />
  )
};

export const mockMuiIcons = {
  CloseRounded: () => <span data-testid="close-icon">×</span>,
  EditOutlined: () => <span data-testid="edit-icon">✏️</span>,
  DeleteOutline: () => <span data-testid="delete-icon">🗑</span>,
  Person: () => <span data-testid="person-icon">👤</span>
};
