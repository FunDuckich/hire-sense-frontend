import { Link } from 'react-router-dom';
import HrVacancyCard from '../components/HrVacancyCard';
import Button from '../components/Button';

const mockHrVacancies = [
  { id: 1, title: 'Бизнес-аналитик', candidatesNew: 2, candidatesTotal: 5 },
  { id: 2, title: 'Frontend-разработчик (React)', candidatesNew: 0, candidatesTotal: 12 },
  { id: 3, title: 'Python Backend Developer', candidatesNew: 5, candidatesTotal: 21 },
];

const HrDashboardPage = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Мои вакансии</h1>
        <Link to="/hr/vacancies/new">
          <Button>+ Создать вакансию</Button>
        </Link>
      </div>

      {mockHrVacancies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockHrVacancies.map((vacancy) => (
            <HrVacancyCard
              key={vacancy.id}
              id={vacancy.id}
              title={vacancy.title}
              candidatesNew={vacancy.candidatesNew}
              candidatesTotal={vacancy.candidatesTotal}
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