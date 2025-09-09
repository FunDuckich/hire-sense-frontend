import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import {getMyFeedback} from '../api/applicationApi';
import Button from '../components/Button';

const MyFeedbackPage = () => {
    const {applicationId} = useParams();
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const data = await getMyFeedback(applicationId);
                setFeedback(data);
            } catch (error) {
                if (error.response?.status !== 404) {
                    toast.error('Не удалось загрузить обратную связь.');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeedback();
    }, [applicationId]);

    const Section = ({title, children, variant}) => {
        const colors = {
            positive: 'border-green-300',
            growth: 'border-yellow-300',
        };
        return (
            <div>
                <h2 className={`text-2xl font-bold text-gray-800 mb-3 pb-2 border-b-2 ${colors[variant]}`}>{title}</h2>
                <div className="text-gray-700 space-y-2">{children}</div>
            </div>
        );
    };

    if (isLoading) {
        return <div className="text-center py-12">Загрузка итогов интервью...</div>;
    }

    if (!feedback || (!feedback.positive_points?.length && !feedback.areas_for_growth?.length)) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700">Обратная связь еще не готова</h2>
                <p className="text-gray-500 mt-2 mb-4">Анализ вашего интервью еще не завершен. Пожалуйста, зайдите
                    позже.</p>
                <Link to="/my-applications">
                    <Button variant="secondary">&larr; К моим откликам</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto my-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Итоги вашего интервью</h1>
                <p className="text-lg text-gray-500 mt-2">Спасибо, что уделили нам время! Вот краткая обратная связь по
                    результатам вашего общения с AI-аватаром.</p>
            </header>

            <div className="space-y-8">
                {feedback.positive_points?.length > 0 && (
                    <Section title="✅ Сильные стороны" variant="positive">
                        <ul className="list-disc pl-5 space-y-1">
                            {feedback.positive_points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </Section>
                )}

                {feedback.areas_for_growth?.length > 0 && (
                    <Section title="💡 Зоны для роста" variant="growth">
                        <ul className="list-disc pl-5 space-y-1">
                            {feedback.areas_for_growth.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                        <p className="text-sm text-gray-500 pt-3">
                            Это лишь рекомендации, основанные на AI-анализе. Мы уверены, что вы сможете достичь больших
                            успехов!
                        </p>
                    </Section>
                )}
            </div>
            <div className="mt-10 text-center">
                <Link to="/my-applications">
                    <Button>&larr; Вернуться к откликам</Button>
                </Link>
            </div>
        </div>
    );
};

export default MyFeedbackPage;