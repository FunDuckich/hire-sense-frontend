import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AI-Recruiter
        </Link>
        <div className="flex items-center">
          <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold">
            Войти
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;