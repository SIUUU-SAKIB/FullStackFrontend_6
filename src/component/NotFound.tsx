
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <div className="text-center p-8 bg-white/20 rounded-lg shadow-lg max-w-lg">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="text-lg font-medium text-blue-500 hover:text-blue-700">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
