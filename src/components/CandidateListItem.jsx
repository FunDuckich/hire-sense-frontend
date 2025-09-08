import { Link } from 'react-router-dom';

const CandidateListItem = ({ vacancyId, applicationId, candidateId, name, statusText, resumeScore, interviewScore, isNew }) => {
  const totalScore = interviewScore ? Math.round((resumeScore + interviewScore) / 2) : resumeScore;

  return (
    <Link 
      to={`/hr/vacancies/${vacancyId}/candidate/${applicationId}/report`} 
      className="block"
    >
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isNew && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-lg">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{statusText}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Резюме</p>
            <p className="font-bold text-lg text-gray-800">{resumeScore || '—'}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Интервью</p>
            <p className="font-bold text-lg text-gray-800">{interviewScore || '—'}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Общее</p>
            <p className="font-bold text-2xl text-blue-600">{totalScore || '—'}%</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CandidateListItem;