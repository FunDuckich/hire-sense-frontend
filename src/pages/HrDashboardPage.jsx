import { Link } from 'react-router-dom';
import HrVacancyCard from '../components/HrVacancyCard';

const mockHrVacancies = [
  {
    id: 1,
    title: 'Бизнес-аналитик',
    status: 'Активна',
    newApplications: 5,
  },
  {
    id: 2,
    title: 'Ведущий специалист ИТ',
    status: 'Активна',
    newApplications: 12,
  },
  {
    id: 3,
    title: 'Frontend Developer (React)',
    status: 'В архиве',
    newApplications: 0,
  },
];

const HrDashboardPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Панель управления вакансиями
          </h1>
          <Link
            to="/hr/vacancies/new"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-semibold"
          >
            + Создать вакансию
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHrVacancies.map((vacancy) => (
            <HrVacancyCard
              key={vacancy.id}
              id={vacancy.id}
              title={vacancy.title}
              status={vacancy.status}
              newApplications={vacancy.newApplications}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HrDashboardPage;