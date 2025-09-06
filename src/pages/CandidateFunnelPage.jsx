import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CandidateListItem from '../components/CandidateListItem';

const mockCandidates = [
  { id: 101, name: 'Иванов Иван', status: 'Ожидает AI-интервью', resumeScore: 75, interviewScore: null, isNew: true, isFavorite: false, date: '2024-09-08' },
  { id: 102, name: 'Петрова Мария', status: 'Интервью пройдено', resumeScore: 88, interviewScore: 92, isNew: false, isFavorite: true, date: '2024-09-07' },
  { id: 103, name: 'Сидоров Алексей', status: 'Ожидает AI-интервью', resumeScore: 91, interviewScore: null, isNew: true, isFavorite: false, date: '2024-09-09' },
  { id: 105, name: 'Васильев Дмитрий', status: 'Интервью пройдено', resumeScore: 95, interviewScore: 85, isNew: false, isFavorite: false, date: '2024-09-06' },
];

const CandidateFunnelPage = () => {
  const { id } = useParams();
  
  return (
    <>
      <div className="mb-6">
        <Link to="/hr/vacancies" className="text-blue-600 hover:underline">
          &larr; К списку вакансий
        </Link>
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Кандидаты на вакансию "Бизнес-аналитик"
          </h1>
          <Link
            to={`/hr/vacancies/${id}/edit`}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Редактировать вакансию
          </Link>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Фильтры:</span>
              <button className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">Все</button>
              <button className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">Избранные</button>
              <button className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">Непросмотренные</button>
          </div>
          <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">Сортировка:</label>
              <select id="sort" className="text-sm rounded-md border-gray-300 shadow-sm">
                  <option>По общему соответствию</option>
                  <option>По проценту резюме</option>
                  <option>По дате отклика</option>
              </select>
          </div>
      </div>

      <div className="space-y-4">
        {mockCandidates.map((candidate) => (
          <CandidateListItem
            key={candidate.id}
            id={candidate.id}
            name={candidate.name}
            status={candidate.status}
            resumeScore={candidate.resumeScore}
            interviewScore={candidate.interviewScore}
            isNew={candidate.isNew}
          />
        ))}
      </div>
    </>
  );
};

export default CandidateFunnelPage;