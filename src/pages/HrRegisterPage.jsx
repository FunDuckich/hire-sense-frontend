import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import { registerHr } from '../api/authApi';

const HrRegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !email || !password) {
            toast.error('Пожалуйста, заполните все поля.');
            return;
        }
        try {
            await registerHr({ name, email, password });
            toast.success('Регистрация прошла успешно! Теперь вы можете войти.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Произошла ошибка при регистрации.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Регистрация для HR
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            id="email"
                            label="Рабочий Email"
                            type="email"
                            autoComplete="email"
                            placeholder="hr@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            id="password"
                            label="Пароль"
                            type="password"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Button type="submit" className="w-full">
                            Зарегистрироваться
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        Уже есть аккаунт?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HrRegisterPage;