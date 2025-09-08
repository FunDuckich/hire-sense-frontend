import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const HrRegisterPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('HR registration form submitted');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Регистрация компании
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md flex flex-col gap-5">
            <Input
              id="name"
              label="Ваше имя"
              type="text"
              autoComplete="name"
              placeholder="Мария Иванова"
            />
            <Input
              id="email"
              label="Рабочий Email"
              type="email"
              autoComplete="email"
              placeholder="hr@company.com"
            />
            <Input
              id="password"
              label="Пароль"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
            />
          </div>

          <div>
            <Button type="submit" className="w-full">
              Зарегистрировать компанию
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Войти в систему
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HrRegisterPage;