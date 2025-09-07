import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const mockVacancies = [
  { id: 1, job_title: 'Бизнес-аналитик', company_name: 'ООО Ромашка', location: 'Москва, гибрид', salary_range: '150 000 - 200 000 руб.' },
  { id: 2, job_title: 'Frontend-разработчик (React)', company_name: 'Tech Solutions', location: 'Удаленно', salary_range: 'от 250 000 руб.' },
  { id: 3, job_title: 'Python Backend Developer', company_name: 'Innovate LLC', location: 'Санкт-Петербург', salary_range: 'до 300 000 руб.' },
  { id: 4, job_title: 'Product Manager', company_name: 'Finance Corp', location: 'Удаленно', salary_range: 'Обсуждается индивидуально' },
];

const VacancyCard = ({ vacancy }) => (
  <Link to={`/vacancies/${vacancy.id}`} className="block">
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 truncate">{vacancy.job_title}</h2>
      <p className="text-md text-gray-600 mt-1">{vacancy.company_name}</p>
      <p className="text-sm text-gray-500 mt-2">{vacancy.location}</p>
      <p className="text-lg font-semibold text-blue-600 mt-4">{vacancy.salary_range}</p>
    </div>
  </Link>
);

const VacancyListPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Открытые вакансии</h1>
      
      {/* Блок фильтров */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Input 
            id="search" 
            label="Поиск по названию или компании" 
            placeholder="Например, Python" 
          />
          <div className="flex flex-col">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Город</label>
            <select id="location" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>Все города</option>
              <option>Удаленно</option>
              <option>Москва</option>
              <option>Санкт-Петербург</option>
            </select>
          </div>
          <Button>Найти</Button>
        </div>
      </div>

      {/* Список вакансий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockVacancies.map(vacancy => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </>
  );
};

export default VacancyListPage;