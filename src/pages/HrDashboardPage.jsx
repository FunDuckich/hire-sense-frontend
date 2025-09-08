import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import HrVacancyCard from '../components/HrVacancyCard';
import Button from '../components/Button';
import { getMyVacancies } from '../api/vacancyApi';

const HrDashboardPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const data = await getMyVacancies();
        setVacancies(data);
      } catch (error) {
        toast.error('Не удалось загрузить вакансии.');
        console.error('Failed to fetch vacancies:', error);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Мои вакансии</h1>
        <Link to="/hr/vacancies/new">
          <Button>+ Создать вакансию</Button>
        </Link>
      </div>

      {vacancies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vacancies.map((vacancy) => (
            <HrVacancyCard
              key={vacancy.id}
              id={vacancy.id}
              title={vacancy.job_title}
              candidatesNew={0} 
              candidatesTotal={0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">У вас пока нет активных вакансий</h2>
          <p className="text-gray-500 mt-2 mb-4">Начните привлекать лучших кандидатов уже сегодня!</p>
          <Link to="/hr/vacancies/new">
            <Button>Создать первую вакансию</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default HrDashboardPage;