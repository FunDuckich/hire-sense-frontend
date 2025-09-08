import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import { getMyApplications } from '../api/applicationApi';

const statusMap = {
  SCREENING: { text: 'Резюме на рассмотрении', class: 'bg-yellow-100 text-yellow-800' },
  INTERVIEW_PENDING: { text: 'Ожидает AI-интервью', class: 'bg-blue-100 text-blue-800' },
  COMPLETED: { text: 'Интервью пройдено', class: 'bg-green-100 text-green-800' },
  REJECTED: { text: 'Отклонено', class: 'bg-red-100 text-red-800' },
};

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data);
      } catch (error) {
        toast.error('Не удалось загрузить ваши отклики.');
        console.error('Failed to fetch applications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (isLoading) {
    return <div className="text-center py-12">Загрузка ваших откликов...</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Мои отклики</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{app.vacancy.job_title}</h2>
                  <p className="text-sm text-gray-600">{app.vacancy.company_name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusMap[app.status]?.class || 'bg-gray-100 text-gray-800'}`}>
                    {statusMap[app.status]?.text || app.status}
                  </span>
                  
                  {app.status === 'INTERVIEW_PENDING' && (
                    <Link to={`/interview/start/${app.id}`} className="text-sm bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 font-semibold">
                      Начать интервью
                    </Link>
                  )}
                  {app.status === 'COMPLETED' && (
                    <Button variant="secondary" className="py-1 px-3 text-sm" disabled>
                      Отчет в обработке
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-700">Вы еще никуда не откликнулись</h2>
            <p className="text-gray-500 mt-2 mb-4">Самое время найти работу мечты!</p>
            <Link to="/vacancies">
              <Button>Смотреть все вакансии</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MyApplicationsPage;