import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import RadarChart from '../components/RadarChart';

const mockReport = {
  candidate: { id: 101, name: 'Иванов Иван' },
  vacancy: { id: 1, title: 'Бизнес-аналитик' },
  overall_score: 87,
  recommendation: 'На следующий этап',
  summary: 'Сильный кандидат с релевантным опытом в антифрод-системах. Продемонстрировал глубокое понимание SQL и принципов работы ДБО. Рекомендуется к техническому интервью с командой.',
  competency_analysis: [
    { criterion: 'Знание SQL', score: 9 },
    { criterion: 'Опыт с Антифродом', score: 10 },
    { criterion: 'Системный анализ', score: 8 },
    { criterion: 'Коммуникация', score: 9 },
    { criterion: 'Знание ДБО ЮЛ', score: 7 },
  ],
  strengths: ['Глубокие знания SQL, привел конкретные примеры оптимизации запросов.', 'Уверенно ориентируется в тематике противодействия мошенничеству.'],
  weaknesses: ['Небольшой пробел в знаниях по клиентскому пути ЮЛ в банке, но быстро сориентировался.'],
  resume_md: '# Иванов Иван\n\n**Опыт работы:**\n\n- Компания X (2018-2023)\n- ...',
};

const CandidateReportPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to={`/hr/vacancies/${mockReport.vacancy.id}/candidates`} className="text-blue-600 hover:underline">
            &larr; К списку кандидатов
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Отчет по кандидату: {mockReport.candidate.name}
          </h1>
          <p className="text-lg text-gray-600">на вакансию "{mockReport.vacancy.title}"</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Оценки по компетенциям</h2>
              <div className="max-w-md mx-auto">
                <RadarChart data={mockReport.competency_analysis} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Сильные стороны</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {mockReport.strengths.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Зоны для роста</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {mockReport.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            
          </div>
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-600">Итоговое соответствие</p>
              <p className="text-6xl font-extrabold text-blue-600 my-2">{mockReport.overall_score}%</p>
              <p className="font-semibold text-green-600">{mockReport.recommendation}</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-2">Общий вывод AI</h3>
              <p className="text-sm text-gray-700">{mockReport.summary}</p>
            </div>
            
            <div className="space-y-3">
              <Button>Пригласить на следующий этап</Button>
              <Button>Скачать отчет в PDF</Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CandidateReportPage;