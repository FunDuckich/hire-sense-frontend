import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import Button from './Button';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  const navLinkClass = ({ isActive }) => 
    `text-gray-600 hover:text-blue-600 font-semibold ${isActive ? 'text-blue-600' : ''}`;
  
  const mobileButtonClass = "text-sm text-white bg-blue-600 hover:bg-blue-700 py-1 px-3 rounded-md shadow-sm font-semibold";

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full">
      <nav className="container mx-auto px-4 py-3 grid grid-cols-3 items-center">
        
        <div className="justify-self-start">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Hire<span className="text-blue-600">Sense</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6 justify-self-center">
          <NavLink to="/vacancies" className={navLinkClass}>Все вакансии</NavLink>
          {isAuthenticated && user?.role === 'CANDIDATE' && <NavLink to="/my-applications" className={navLinkClass}>Мои отклики</NavLink>}
          {isAuthenticated && user?.role === 'HR' && <NavLink to="/hr/vacancies" className={navLinkClass}>Мои вакансии</NavLink>}
        </div>

        <div className="hidden md:flex items-center gap-4 justify-self-end">
          {isAuthenticated ? (
            <button onClick={logout} className={navLinkClass({})}>Выйти</button>
          ) : (
            <Link to="/login" className={navLinkClass({})}>Войти</Link>
          )}
          {!isAuthenticated ? (
            <Link to="/candidate/register"><Button>Регистрация</Button></Link>
          ) : (
            <Link to={user.role === 'HR' ? '/hr/vacancies/new' : '/hr/register'}><Button>Разместить вакансию</Button></Link>
          )}
        </div>

        <div className="md:hidden col-start-2 col-span-2 flex justify-end items-center gap-4">
          {isAuthenticated ? (
            user.role === 'CANDIDATE' ? (
              <>
                <NavLink to="/vacancies" className={navLinkClass}>Все вакансии</NavLink>
                <Link to="/my-applications" className={mobileButtonClass}>Мои отклики</Link>
              </>
            ) : ( 
              <>
                <NavLink to="/vacancies" className={navLinkClass}>Все вакансии</NavLink>
                <Link to="/hr/vacancies" className={mobileButtonClass}>Мои вакансии</Link>
              </>
            )
          ) : (
            <>
              <NavLink to="/vacancies" className={navLinkClass}>Все вакансии</NavLink>
              <Link to="/login" className={navLinkClass({})}>Войти</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;