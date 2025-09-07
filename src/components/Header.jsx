import { Link, NavLink } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import Button from './Button';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const navLinkClass = ({ isActive }) => 
    `text-gray-600 hover:text-blue-600 font-semibold ${isActive ? 'text-blue-600' : ''}`;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Hire<span className="text-blue-600">Sense</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/vacancies" className={navLinkClass}>
            Все вакансии
          </NavLink>
          {isAuthenticated && user?.role === 'CANDIDATE' && (
             <NavLink to="/my-applications" className={navLinkClass}>
              Мои отклики
            </NavLink>
          )}
           {isAuthenticated && user?.role === 'HR' && (
             <NavLink to="/hr/vacancies" className={navLinkClass}>
              Мои вакансии
            </NavLink>
          )}
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <button onClick={logout} className="text-gray-600 hover:text-blue-600 font-semibold">
              Выйти
            </button>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-semibold">
              Войти
            </Link>
          )}

          <Link to={isAuthenticated && user?.role === 'HR' ? '/hr/vacancies/create' : '/hr/register'}>
            <Button>Разместить вакансию</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;