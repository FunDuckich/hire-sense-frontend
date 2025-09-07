import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const HrRegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Регистрация HR-менеджера
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Уже есть аккаунт?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Войти
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input id="name" label="Ваше имя" placeholder="Мария Иванова" />
          <Input id="email" type="email" label="Рабочий Email" placeholder="hr@company.com" />
          <Input id="password" type="password" label="Пароль" placeholder="••••••••" />
          <div>
            <Button type="submit" className="w-full">
              Создать аккаунт
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HrRegisterPage;