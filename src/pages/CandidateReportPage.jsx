import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import RadarChart from '../components/RadarChart';
import {getApplicationById} from '../api/applicationApi';
import Button from '../components/Button';

const CandidateReportPage = () => {
    const {applicationId} = useParams();
    const [application, setApplication] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchApplicationData = async () => {
            setIsLoading(true);
            try {
                const appData = await getApplicationById(applicationId);
                setApplication(appData);
            } catch (error) {
                toast.error('Не удалось загрузить данные отклика.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchApplicationData();
    }, [applicationId]);

    const Section = ({title, children}) => (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">{title}</h2>
            <div className="text-gray-700 space-y-2">{children}</div>
        </div>
    );

    if (isLoading) return <div className="text-center py-12">Загрузка отчета...</div>;
    if (!application) return <div className="text-center py-12">Отклик не найден.</div>;

    const analysis = application.interview_report?.analysis_result;

    if (!analysis) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700">Отчет еще не готов</h2>
                <p className="text-gray-500 mt-2 mb-4">AI-анализ интервью еще не завершен. Пожалуйста, зайдите
                    позже.</p>
                {application?.vacancy?.id && (
                    <Link to={`/hr/vacancies/${application.vacancy.id}/candidates`}>
                        <Button variant="secondary">&larr; К списку кандидатов</Button>
                    </Link>
                )}
            </div>
        );
    }

    if (analysis.status_note) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700">Отчет по прерванному интервью</h2>
                <p className="text-gray-500 mt-2 mb-4 max-w-2xl mx-auto">{analysis.summary}</p>
                {application?.vacancy?.id && (
                    <Link to={`/hr/vacancies/${application.vacancy.id}/candidates`}>
                        <Button variant="secondary">&larr; К списку кандидатов</Button>
                    </Link>
                )}
            </div>
        );
    }

    return (
        <>
            <div className="mb-6">
                {application?.vacancy?.id && (
                    <Link to={`/hr/vacancies/${application.vacancy.id}/candidates`}
                          className="text-blue-600 hover:underline">
                        &larr; К списку кандидатов
                    </Link>
                )}
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">{application?.candidate.name}</h1>
                    <p className="text-lg text-gray-500">Отчет по результатам AI-интервью на вакансию
                        "{application?.vacancy.job_title}"</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Section title="Краткое резюме"><p>{analysis.summary}</p></Section>
                        <Section title="Анализ Hard Skills">
                            <p><strong>Оценка:</strong> {analysis.hard_skills_analysis?.score}/10</p>
                            <p className="italic bg-gray-50 p-3 rounded-md">"{analysis.hard_skills_analysis?.assessment}"</p>
                        </Section>
                        <Section title="Анализ Soft Skills"><p>{analysis.soft_skills_analysis?.assessment}</p></Section>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Section title="Сильные стороны">
                                <ul className="list-disc pl-5 space-y-1">{analysis.strengths?.map((item, i) => <li
                                    key={i}>{item}</li>)}</ul>
                            </Section>
                            <Section title="Зоны роста">
                                <ul className="list-disc pl-5 space-y-1">{analysis.weaknesses?.map((item, i) => <li
                                    key={i}>{item}</li>)}</ul>
                            </Section>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Итоговая рекомендация</h2>
                            <p className={`text-xl font-semibold p-4 rounded-lg ${analysis.recommendation?.includes('Рекомендуем') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {analysis.recommendation}
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Общая оценка</h3>
                            <p className="text-5xl font-bold text-blue-600">{analysis.overall_score}<span
                                className="text-2xl text-gray-500">%</span></p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Диаграмма компетенций</h3>
                            <RadarChart data={analysis.radar_chart_data || []}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CandidateReportPage;