import {Link} from 'react-router-dom';

const HrVacancyCard = ({id, title}) => {
    return (
        <Link
            to={`/hr/vacancies/${id}/candidates`}
            className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <div className="mt-4 border-t pt-4">
                <p className="text-blue-600 font-semibold hover:underline">
                    Посмотреть кандидатов &rarr;
                </p>
            </div>
        </Link>
    );
};

export default HrVacancyCard;