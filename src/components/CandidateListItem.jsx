import {Link} from 'react-router-dom';

const CandidateListItem = ({
                               applicationId,
                               name,
                               statusText,
                               resumeScore,
                               interviewScore,
                               wasInterviewCompletedCorrectly
                           }) => {

    const interviewDisplay = () => {
        if (statusText !== 'Интервью пройдено' && statusText !== 'Отклонено') {
            return <p className="font-bold text-lg text-gray-400">—</p>;
        }
        if (wasInterviewCompletedCorrectly === false) {
            return <p className="font-bold text-sm text-yellow-600">Прервано</p>;
        }
        if (interviewScore != null) {
            return <p className="font-bold text-lg text-gray-800">{interviewScore}%</p>;
        }
        return <p className="font-bold text-sm text-gray-500 animate-pulse">Обработка...</p>;
    };

    return (
        <Link to={`/hr/applications/${applicationId}/report`} className="block">
            <div
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-lg">
                        {name?.charAt(0) || '?'}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                        <p className="text-sm text-gray-600">{statusText}</p>
                    </div>
                </div>

                <div className="flex items-center gap-8 pr-4">
                    <div className="text-center min-w-[70px]">
                        <p className="text-sm text-gray-500">Резюме</p>
                        <p className="font-bold text-lg text-gray-800">{resumeScore ?? '—'}%</p>
                    </div>
                    <div className="text-center min-w-[70px]">
                        <p className="text-sm text-gray-500">Интервью</p>
                        {interviewDisplay()}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CandidateListItem;