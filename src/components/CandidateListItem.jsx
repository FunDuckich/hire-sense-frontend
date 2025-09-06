import { Link } from 'react-router-dom';
import { useState } from 'react';

const statusStyles = {
  'Ожидает AI-интервью': 'bg-yellow-100 text-yellow-800',
  'Интервью пройдено': 'bg-green-100 text-green-800',
};

const StarIcon = ({ isFavorite, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isFavorite ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CandidateListItem = ({ id, name, status, resumeScore, interviewScore, isNew }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link
      to={`/hr/candidates/${id}/report`}
      className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {isNew && <span className="w-3 h-3 bg-blue-500 rounded-full" title="Новый отклик"></span>}
          <p className="font-bold text-lg text-gray-800">{name}</p>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleFavoriteClick}
            className={`text-gray-400 hover:text-yellow-500 ${isFavorite ? 'text-yellow-500' : ''}`}
            title="Добавить в избранное"
          >
            <StarIcon isFavorite={isFavorite} />
          </button>
        </div>
      </div>
      <div className="mt-4 border-t pt-3 flex items-center gap-6">
        <div className="text-sm">
          <span className="text-gray-500">Резюме: </span>
          <span className="font-semibold text-gray-800">{resumeScore}%</span>
        </div>
        {interviewScore && (
          <div className="text-sm">
            <span className="text-gray-500">Интервью: </span>
            <span className="font-semibold text-lg text-blue-600">{interviewScore}%</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CandidateListItem;