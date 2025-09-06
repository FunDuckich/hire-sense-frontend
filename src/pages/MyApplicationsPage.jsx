import { Link } from 'react-router-dom';
import Button from '../components/Button';

const mockApplications = [
  {
    vacancyId: 1,
    vacancyTitle: 'Бизнес-аналитик',
    company: 'Yandex',
    status: 'Приглашение на интервью',
    interviewId: 60
  },
  {
    vacancyId: 2,
    vacancyTitle: 'Ведущий специалист ИТ',
    company: 'SberTech',
    status: 'Резюме на рассмотрении',
    interviewId: null
  },
  {
    vacancyId: 3,
    vacancyTitle: 'Frontend Developer (React)',
    company: 'VK',
    status: 'Отказ',
    interviewId: null
  },
];

const statusStyles = {
  'Приглашение на интервью': 'bg-green-100 text-green-800',
  'Резюме на рассмотрении': 'bg-yellow-100 text-yellow-800',
  'Отказ': 'bg-red-100 text-red-800',
};

const MyApplicationsPage = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Мои отклики
        </h1>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {mockApplications.length > 0 ? (
          <div className="space-y-6">
            {mockApplications.map((app) => (
              <div key={app.vacancyId} className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{app.vacancyTitle}</h2>
                  <p className="text-gray-600">{app.company}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${statusStyles[app.status]}`}
                  >
                    {app.status}
                  </span>
                  {app.status === 'Приглашение на интервью' && (
                    <Link to={`/interview/${app.interviewId}`}>
                      <Button>Начать интервью</Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-10">Вы еще не откликались на вакансии.</p>
        )}
      </div>
    </>
  );
};

export default MyApplicationsPage;