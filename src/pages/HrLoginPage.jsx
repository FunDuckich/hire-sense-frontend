import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';

const HrLoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('HR login form submitted');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Вход для HR-менеджеров
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm flex flex-col gap-5">
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
                Войти в панель управления
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Еще нет аккаунта?{' '}
            <Link to="/hr/register" className="font-medium text-blue-600 hover:text-blue-500">
              Зарегистрировать компанию
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HrLoginPage;