import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Unified login form submitted');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Вход в систему
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm flex flex-col gap-5">
              <Input
                id="email"
                label="Email адрес"
                type="email"
                autoComplete="email"
                placeholder="email@example.com"
              />
              <Input
                id="password"
                label="Пароль"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </div>

            <div className="text-sm text-right">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Забыли пароль?
              </a>
            </div>

            <div>
              <Button type="submit">
                Войти
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Еще нет аккаунта?{' '}
              <Link to="/candidate/register" className="font-medium text-blue-600 hover:text-blue-500">
                Создать профиль кандидата
              </Link>
            </p>
            <p className="mt-2">
              Вы представитель компании?{' '}
              <Link to="/hr/register" className="font-medium text-blue-600 hover:text-blue-500">
                Зарегистрировать компанию
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;