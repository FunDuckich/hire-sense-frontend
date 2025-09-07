import { Link } from 'react-router-dom';
import Button from '../components/Button';

const mockVacancy = {
  job_title: "Бизнес-аналитик",
  company_name: "ООО Ромашка",
  location: "Москва, гибрид",
  salary_range: "150 000 - 200 000 руб.",
  key_responsibilities: "Управление системой X\nФормирование требований к доработке\nВзаимодействие с командой разработки",
  hard_skills: "SQL (сложные запросы)\nPython (pandas)\nОпыт работы с Jira и Confluence",
  what_we_offer: "ДМС после испытательного срока\nГибкое начало рабочего дня\nСовременный офис и техника",
};

const VacancyDetailPage = () => {
    return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{mockVacancy.job_title}</h1>
            <p className="text-lg text-gray-500 mt-1">{mockVacancy.company_name} &middot; {mockVacancy.location}</p>
            <p className="text-2xl font-semibold text-blue-600 mt-2">{mockVacancy.salary_range}</p>
          </div>
          <div className="mt-2 flex-shrink-0">
            <Button>Откликнуться</Button>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Ключевые обязанности:</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {mockVacancy.key_responsibilities.split('\n').map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
            <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Требования:</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {mockVacancy.hard_skills.split('\n').map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Мы предлагаем:</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {mockVacancy.what_we_offer.split('\n').map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <Link to="/" className="text-blue-600 hover:underline">
          &larr; Вернуться к списку вакансий
        </Link>
      </div>
    </>
    );
};

export default VacancyDetailPage;