import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const CandidateRegisterPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Registration form submitted');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Создание профиля кандидата
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm flex flex-col gap-5">
              <Input
                id="name"
                label="Ваше имя"
                type="text"
                autoComplete="name"
                placeholder="Иван Иванов"
              />
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
                autoComplete="new-password"
                placeholder="••••••••"
              />
              <Input
                id="confirm-password"
                label="Повторите пароль"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
              />
            </div>

            <div>
              <Button type="submit">
                Зарегистрироваться
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Войти
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default CandidateRegisterPage;