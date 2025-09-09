import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import {getAllVacancies} from '../api/vacancyApi';

const VacancyCard = ({vacancy}) => (
    <Link to={`/vacancies/${vacancy.id}`} className="block">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
            <h2 className="text-xl font-bold text-gray-800 truncate">{vacancy.job_title}</h2>
            <p className="text-md text-gray-600 mt-1">{vacancy.company_name}</p>
            <p className="text-sm text-gray-500 mt-2">{vacancy.location}</p>
            <p className="text-lg font-semibold text-blue-600 mt-4 flex-grow">
                {vacancy.salary_display || ''}
            </p>
        </div>
    </Link>
);

const VacancyListPage = () => {
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const data = await getAllVacancies();
                setVacancies(data);
            } catch (error) {
                toast.error('Не удалось загрузить список вакансий.');
                console.error('Failed to fetch all vacancies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    if (isLoading) {
        return <div className="text-center py-12">Загрузка вакансий...</div>;
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Открытые вакансии</h1>

            <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <Input
                        id="search"
                        label="Поиск по названию или компании"
                        placeholder="Например, Python"
                    />
                    <div className="flex flex-col">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                        <select id="location"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Все города</option>
                            <option>Удаленно</option>
                            <option>Москва</option>
                            <option>Санкт-Петербург</option>
                        </select>
                    </div>
                    <Button>Найти</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vacancies.map(vacancy => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy}/>
                ))}
            </div>
        </>
    );
};

export default VacancyListPage;