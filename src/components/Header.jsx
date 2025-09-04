import { Link } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AI-Recruiter
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to={user?.role === 'HR' ? '/hr/vacancies' : '/my-applications'}
                className="font-medium text-gray-600 hover:text-blue-600"
              >
                Личный кабинет
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold">
              Войти
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;