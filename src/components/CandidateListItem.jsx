import { Link } from 'react-router-dom';

const statusStyles = {
  'Новый отклик': 'bg-blue-100 text-blue-800',
  'Интервью пройдено': 'bg-green-100 text-green-800',
  'Архив': 'bg-gray-100 text-gray-800',
};

const CandidateListItem = ({ id, name, status, score }) => {
  return (
    <Link
      to={`/hr/candidates/${id}/report`}
      className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex justify-between items-center">
        <p className="font-bold text-gray-800">{name}</p>
        <p className="font-semibold text-gray-900">
          Соответствие: <span className="text-xl text-blue-600">{score}%</span>
        </p>
      </div>
      <div className="mt-2">
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
    </Link>
  );
};

export default CandidateListItem;