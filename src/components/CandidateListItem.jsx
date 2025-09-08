import { Link } from 'react-router-dom';

const CandidateListItem = ({ id, name, status, resumeScore, interviewScore, isNew }) => {
  const scoreColor = interviewScore >= 85 ? 'text-green-600' : 'text-yellow-600';

  return (
    <Link to={`/hr/candidates/${id}/report`} className="block">
      <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
        <div className="flex items-center gap-4">
          {isNew && <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>}
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{status}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-center">
          <div>
            <p className="text-sm text-gray-500">Резюме</p>
            <p className="font-bold text-lg text-gray-800">{resumeScore}%</p>
          </div>
          {interviewScore !== null && (
            <div>
              <p className="text-sm text-gray-500">Интервью</p>
              <p className={`font-bold text-lg ${scoreColor}`}>{interviewScore}%</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CandidateListItem;