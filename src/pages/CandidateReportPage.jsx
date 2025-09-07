import { Link, useParams } from 'react-router-dom';
import RadarChart from '../components/RadarChart';

const mockReport = {
  candidate: { name: 'Петрова Мария' },
  vacancy: { title: 'Бизнес-аналитик' },
  overall_score: 89,
  recommendation: 'Рекомендуем к следующему этапу',
  summary: 'Мария продемонстрировала глубокое понимание процессов бизнес-анализа и отличные коммуникативные навыки. Уверенно отвечает на технические вопросы, приводит релевантные примеры из опыта.',
  strengths: ['Сильные аналитические способности', 'Опыт в Scrum', 'Проактивность'],
  weaknesses: ['Недостаточно опыта в работе с BI-системами', 'Небольшой опыт в A/B тестировании'],
  hard_skills_analysis: {
    score: 9,
    assessment: 'Отличное знание SQL, уверенно описывает сложные запросы. "На прошлом проекте я оптимизировала запрос, который ускорил генерацию отчета с 2 часов до 5 минут".',
  },
  soft_skills_analysis: {
    assessment: 'Кандидат говорит четко и по делу. Активно использует фразы-маркеры достижений ("реализовала", "внедрила").',
    confidence_score: 9,
    proactivity_score: 10,
    attitude_score: 8,
  },
  radarData: {
    labels: ['Знание SQL', 'Опыт в Scrum', 'Коммуникация', 'Аналитика', 'Системное мышление'],
    datasets: [{
      label: 'Оценка кандидата',
      data: [9, 8, 9, 10, 7],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2,
    }],
  },
};

const CandidateReportPage = () => {
    const { vacancyId, candidateId } = useParams();

    const Section = ({ title, children }) => (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">{title}</h2>
        <div className="text-gray-700 space-y-2">
          {children}
        </div>
      </div>
    );

    return (
    <>
      <div className="mb-6">
        <Link to={`/hr/vacancies/${vacancyId}/funnel`} className="text-blue-600 hover:underline">
          &larr; К воронке кандидатов
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{mockReport.candidate.name}</h1>
          <p className="text-lg text-gray-500">Отчет по результатам AI-интервью на вакансию "{mockReport.vacancy.title}"</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Section title="Краткое резюме">
              <p>{mockReport.summary}</p>
            </Section>
            
            <Section title="Анализ Hard Skills">
                <p><strong>Оценка:</strong> {mockReport.hard_skills_analysis.score}/10</p>
                <p className="italic bg-gray-50 p-3 rounded-md">"{mockReport.hard_skills_analysis.assessment}"</p>
            </Section>

             <Section title="Анализ Soft Skills">
                <p>{mockReport.soft_skills_analysis.assessment}</p>
            </Section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Section title="Сильные стороны">
                  <ul className="list-disc pl-5 space-y-1">
                      {mockReport.strengths.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
              </Section>
              <Section title="Зоны роста">
                  <ul className="list-disc pl-5 space-y-1">
                      {mockReport.weaknesses.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
              </Section>
            </div>

            <div className="pt-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Итоговая рекомендация</h2>
              <p className={`text-xl font-semibold p-4 rounded-lg ${mockReport.recommendation.includes('Рекомендуем') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {mockReport.recommendation}
              </p>
            </div>

          </div>
          <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Общая оценка</h3>
                <p className="text-5xl font-bold text-blue-600">{mockReport.overall_score}<span className="text-2xl text-gray-500">%</span></p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Диаграмма компетенций</h3>
                <RadarChart data={mockReport.radarData} />
              </div>
          </div>
        </div>
      </div>
    </>
    );
};

export default CandidateReportPage;