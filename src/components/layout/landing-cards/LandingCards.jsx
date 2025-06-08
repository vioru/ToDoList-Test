import { Adjust, Bolt, CheckCircle, Person } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';


const LandingCards= () => {

const navigate = useNavigate();
  const onGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center m-5 text-center" >

      

        <div className="grid grid-cols-1 sm:grid-col gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 my-2">
              <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Gestión Simple</h3>
              <p className="text-gray-600 text-sm">Crea, edita y completa tareas de manera intuitiva</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 my-2">
              <Person className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Asignación de Usuarios</h3>
              <p className="text-gray-600 text-sm">Asigna tareas a diferentes miembros del equipo</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 my-2">
              <Adjust className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Filtros </h3>
              <p className="text-gray-600 text-sm">Encuentra rápidamente lo que necesitas con filtros avanzados</p>
            </div>
            
          </div>

  
          <div className="space-y-4 mb-4">
            <button
              onClick={onGetStarted}
              className="w-full  rounded-full  m-5 sm:w-auto bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-10 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Comenzar Ahora
            </button>
        </div>
      
    </div>
  )
}



export default LandingCards

