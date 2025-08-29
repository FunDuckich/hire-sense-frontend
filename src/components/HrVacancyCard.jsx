import { Link } from 'react-router-dom';

const statusStyles = {
  Активна: 'bg-green-100 text-green-800',
  'В архиве': 'bg-gray-100 text-gray-800',
};

const HrVacancyCard = ({ id, title, status, newApplications }) => {
  return (
    <Link
      to={`/hr/vacancies/${id}/candidates`}
      className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
      <div className="mt-4 border-t pt-4">
        <p className="text-sm text-gray-600">
          Новых откликов: <span className="font-bold text-blue-600">{newApplications}</span>
        </p>
      </div>
    </Link>
  );
};

export default HrVacancyCard;