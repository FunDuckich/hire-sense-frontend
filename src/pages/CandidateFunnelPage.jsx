import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CandidateListItem from '../components/CandidateListItem';

const mockCandidates = [
  { id: 101, name: 'Иванов Иван', status: 'Новый отклик', score: 92 },
  { id: 102, name: 'Петрова Мария', status: 'Интервью пройдено', score: 85 },
  { id: 103, name: 'Сидоров Алексей', status: 'Новый отклик', score: 78 },
  { id: 104, name: 'Кузнецова Елена', status: 'Архив', score: 65 },
  { id: 105, name: 'Васильев Дмитрий', status: 'Интервью пройдено', score: 95 },
];

const TABS = ['Новый отклик', 'Интервью пройдено', 'Архив'];

const CandidateFunnelPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const filteredCandidates = mockCandidates.filter(c => c.status === activeTab);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/hr/vacancies" className="text-blue-600 hover:underline">
            &larr; К списку вакансий
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">
            Кандидаты на вакансию "Бизнес-аналитик"
          </h1>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <CandidateListItem
                key={candidate.id}
                id={candidate.id}
                name={candidate.name}
                status={candidate.status}
                score={candidate.score}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">В этой категории кандидатов пока нет.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateFunnelPage;