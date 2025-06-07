import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import TodoList from '../TodoList';
import AddTodoModal from '../modals/TodoModal';
import ErrorAlert from '../common/ErrorAlert';
import LoadingOverlay from '../common/LoadingOverlay';

const MainLayout = ({ loading, error, onRefresh, onToggleApi, onClearError }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onToggleApi={onToggleApi} />
      
      <main className="flex-1 overflow-auto bg-gray-50">
        <Header onAddClick={() => setIsAddModalOpen(true)} />
        
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="bg-white rounded-lg shadow-sm">
            <LoadingOverlay loading={loading} />
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

export default MainLayout;