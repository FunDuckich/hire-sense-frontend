import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Вход в аккаунт
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Нет аккаунта?{' '}
            <Link to="/candidate/register" className="font-medium text-blue-600 hover:text-blue-500">
              Зарегистрируйтесь как кандидат
            </Link>
            {' или '}
            <Link to="/hr/register" className="font-medium text-blue-600 hover:text-blue-500">
              как HR
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input id="email" type="email" label="Email" placeholder="you@example.com" />
          <Input id="password" type="password" label="Пароль" placeholder="••••••••" />
          <div>
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;