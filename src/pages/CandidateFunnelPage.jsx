import {useState, useEffect} from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';
import toast from 'react-hot-toast';
import CandidateListItem from '../components/CandidateListItem';
import {getApplicationsForVacancy} from '../api/applicationApi';

const statusMap = {
    SCREENING: {text: 'Резюме на рассмотрении'},
    INTERVIEW_PENDING: {text: 'Ожидает AI-интервью'},
    COMPLETED: {text: 'Интервью пройдено'},
    REJECTED: {text: 'Отклонено'},
};

const CandidateFunnelPage = () => {
    const {id: vacancyId} = useParams();
    const location = useLocation();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [vacancyTitle, setVacancyTitle] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
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
    }, [vacancyId, location.key]);

    const sortedApplications = applications.slice().sort((a, b) => {
        const scoreB = b.interview_overall_score ?? -1;
        const scoreA = a.interview_overall_score ?? -1;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return (b.screening_match_score ?? -1) - (a.screening_match_score ?? -1);
    });

    if (isLoading) return <div className="text-center py-12">Загрузка...</div>;

    return (
        <>
            <div className="mb-6">
                <Link to="/hr/vacancies" className="text-blue-600 hover:underline">
                    &larr; К списку вакансий
                </Link>
                <div className="flex justify-between items-center mt-2">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Кандидаты на вакансию "{vacancyTitle || '...'}"
                    </h1>
                    <Link to={`/hr/vacancies/${vacancyId}/edit`}
                          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 font-semibold">
                        Редактировать
                    </Link>
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