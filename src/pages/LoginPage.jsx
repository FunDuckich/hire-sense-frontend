import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import useAuthStore from '../stores/useAuthStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error('Пожалуйста, заполните все поля.');
      return;
    }
    try {
      await login(email, password);
      toast.success('Вход выполнен успешно!');
      
      const loggedInUser = useAuthStore.getState().user;
      if (loggedInUser?.role === 'HR') {
        navigate('/hr/vacancies');
      } else {
        navigate('/my-applications');
      }
    } catch (error) {
      toast.error('Неверный email или пароль. Попробуйте снова.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход в систему
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md flex flex-col gap-5">
            <Input
              id="email"
              label="Email адрес"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Пароль"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-sm text-right">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Забыли пароль?
            </a>
          </div>
          <div>
            <Button type="submit" className="w-full">
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
    </div>
  );
};

export default LoginPage;