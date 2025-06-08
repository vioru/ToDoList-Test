import { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/Header';
import TodoList from '../../main-components/list-ToDo/ListToDo';
import AddTodoModal from '../../modals/TodoModal';
import ErrorAlert from '../../status/ErrorAlert';

const MainLayout = ({ error, onRefresh, onToggleApi, onClearError }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden  bg-gray-50">
      <Sidebar onToggleApi={onToggleApi} />
      
      <main className="flex-1 overflow-auto bg-gray-50">
        <Header onAddClick={() => setIsAddModalOpen(true)} />
        
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <TodoList />
          </div>

          <ErrorAlert 
            message={error} 
            onDismiss={onClearError} 
          />
        </div>

        <AddTodoModal 
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  error: PropTypes.string,
  onRefresh: PropTypes.func,
  onToggleApi: PropTypes.func.isRequired,
  onClearError: PropTypes.func,
};

export default MainLayout;