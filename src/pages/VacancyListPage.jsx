import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import toast from 'react-hot-toast';
import {getAllVacancies} from '../api/vacancyApi';

const VacancyCard = ({vacancy}) => (
    <Link to={`/vacancies/${vacancy.id}`} className="block">
        <div
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
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
            <h1 className="text-3xl font-bold text-gray-800 my-6">Открытые вакансии</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vacancies.map(vacancy => (
                    <VacancyCard key={vacancy.id} vacancy={vacancy}/>
                ))}
            </div>
        </>
    );
};

export default VacancyListPage;