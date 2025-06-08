import LandingCards from '../landing-cards/LandingCards';
import { TrackChanges } from '@mui/icons-material';

const LandingMain = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 py-12 bg-gray-50">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl items-center lg:items-stretch gap-12">
        
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          <div className="flex flex-col items-center lg:items-start space-y-4 ">
            <div className="flex flex-row items-center justify-center bg-white px-6 py-3 rounded-full shadow-lg gap-3 mx-auto">
              <TrackChanges className="w-8 h-8 text-purple-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                Task Flow
              </h1>
            </div>

            <p className="text-gray-600 text-lg max-w-md text-center">
              Tu herramienta definitiva para organizar tareas y maximizar la productividad
            </p>
          </div>

          <img
            src="/assets/img/team_work.svg"
            alt="people work illustration"
            className="w-full max-w-md h-auto"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6">
          <LandingCards />
        </div>
      </div>
    </div>
  );
};

export default LandingMain;