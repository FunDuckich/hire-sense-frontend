import { Link } from 'react-router-dom'; 

const mockApplications = [
  { id: 1, vacancyTitle: 'Frontend-разработчик (React)', company: 'Tech Solutions', status: 'Интервью пройдено', applicationId: 201 },
  { id: 2, vacancyTitle: 'Бизнес-аналитик', company: 'Finance Corp', status: 'Ожидает AI-интервью', applicationId: 202 },
  { id: 3, vacancyTitle: 'Product Manager', company: 'Innovate LLC', status: 'Отклонено', applicationId: 203 },
];

const MyApplicationsPage = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Интервью пройдено': return 'bg-green-100 text-green-800';
      case 'Ожидает AI-интервью': return 'bg-blue-100 text-blue-800';
      case 'Отклонено': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Мои отклики</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {mockApplications.map(app => (
            <div key={app.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{app.vacancyTitle}</h2>
                <p className="text-sm text-gray-600">{app.company}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(app.status)}`}>
                  {app.status}
                </span>
                
                {app.status === 'Ожидает AI-интервью' && (
                  <Link 
                    to={`/interview/${app.applicationId}`} 
                    className="text-sm bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Начать интервью
                  </Link>
                )}

                 {app.status === 'Интервью пройдено' && (
                  <button className="text-sm bg-gray-200 text-gray-800 py-1 px-3 rounded-lg hover:bg-gray-300 font-semibold">
                    Смотреть отчет
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyApplicationsPage;