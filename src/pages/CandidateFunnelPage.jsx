import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import CandidateListItem from '../components/CandidateListItem';
import {getApplicationsForVacancy} from '../api/applicationApi';

const statusMap = {
    SCREENING: {text: 'Резюме на рассмотрении', class: 'bg-yellow-100 text-yellow-800'},
    INTERVIEW_PENDING: {text: 'Ожидает AI-интервью', class: 'bg-blue-100 text-blue-800'},
    COMPLETED: {text: 'Интервью пройдено', class: 'bg-green-100 text-green-800'},
    REJECTED: {text: 'Отклонено', class: 'bg-red-100 text-red-800'},
};

const CandidateFunnelPage = () => {
    const {id: vacancyId} = useParams();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [vacancyTitle, setVacancyTitle] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await getApplicationsForVacancy(vacancyId);
                setApplications(data);
                if (data.length > 0) {
                    setVacancyTitle(data[0].job_title);
                }
            } catch (error) {
                toast.error('Не удалось загрузить список кандидатов.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplications();
    }, [vacancyId]);

    const sortedApplications = applications.slice().sort((a, b) => {
        const interviewA = a.interview_overall_score ?? -1;
        const interviewB = b.interview_overall_score ?? -1;

        if (interviewB !== interviewA) {
            return interviewB - interviewA;
        }

        const resumeA = a.screening_match_score ?? -1;
        const resumeB = b.screening_match_score ?? -1;
        return resumeB - resumeA;
    });

    if (isLoading) {
        return <div className="text-center py-12">Загрузка кандидатов...</div>;
    }

    return (
        <>
            <div className="mb-6">
                <Link to="/hr/vacancies" className="text-blue-600 hover:underline">
                    &larr; К списку вакансий
                </Link>
                <div className="flex justify-between items-center mt-2">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Кандидаты на вакансию "{vacancyTitle || '...'} "
                    </h1>
                    <Link
                        to={`/hr/vacancies/${vacancyId}/edit`}
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
                    <button
                        className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">Непросмотренные
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {sortedApplications.length > 0 ? (
                    sortedApplications.map((app) => (
                        <CandidateListItem
                            key={app.id}
                            applicationId={app.id}
                            name={app.candidate.name}
                            statusText={statusMap[app.status]?.text || app.status}
                            resumeScore={app.screening_match_score}
                            interviewScore={app.interview_overall_score}
                            isNew={app.status === 'SCREENING'}
                            wasInterviewCompletedCorrectly={app.interview_was_completed_correctly}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-700">На эту вакансию еще нет откликов</h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default CandidateFunnelPage;