import {useState, useEffect, useRef} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import {getVacancyById} from '../api/vacancyApi';
import {applyForVacancy} from '../api/applicationApi';
import useAuthStore from '../stores/useAuthStore';

const VacancyDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [vacancy, setVacancy] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);
    const {isAuthenticated, user} = useAuthStore();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const data = await getVacancyById(id);
                setVacancy(data);
            } catch (error) {
                toast.error('Не удалось загрузить данные о вакансии.');
                console.error('Failed to fetch vacancy details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVacancy();
    }, [id]);

    const handleApplyClick = () => {
        console.log('Button clicked!');
        console.log('fileInputRef.current:', fileInputRef.current);
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsApplying(true);
        const toastId = toast.loading('Отправляем ваш отклик...');

        try {
            await applyForVacancy(id, file);
            toast.success('Ваш отклик успешно отправлен!', {id: toastId});
            navigate('/my-applications');
        } catch (error) {
            toast.error('Не удалось отправить отклик. Попробуйте снова.', {id: toastId});
            console.error('Failed to apply for vacancy:', error);
        } finally {
            setIsApplying(false);
        }
    };

    if (isLoading) {
        return <div className="text-center py-12">Загрузка данных о вакансии...</div>;
    }

    if (!vacancy) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-700">Вакансия не найдена</h2>
                <p className="text-gray-500 mt-2 mb-4">Возможно, она была перенесена в архив.</p>
                <Link to="/vacancies">
                    <Button>К списку вакансий</Button>
                </Link>
            </div>
        );
    }

    console.log('isApplying state is:', isApplying);

    return (
        <>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">{vacancy.job_title}</h1>
                        <p className="text-lg text-gray-500 mt-1">{vacancy.company_name} &middot; {vacancy.location}</p>
                        <p className="text-2xl font-semibold text-blue-600 mt-2">{vacancy.salary_range}</p>
                    </div>
                    <div className="mt-2 flex-shrink-0">
                        {isAuthenticated && user?.role === 'CANDIDATE' && (
                            <>
                                <Button onClick={handleApplyClick} disabled={isApplying}>
                                    {isApplying ? 'Отправка...' : 'Откликнуться'}
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx"
                                />
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-8 border-t pt-6 space-y-6">
                    {vacancy.key_responsibilities && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Ключевые обязанности:</h2>
                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                {vacancy.key_responsibilities.split('\n').map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    )}
                    {vacancy.hard_skills && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Требования:</h2>
                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                {vacancy.hard_skills.split('\n').map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    )}
                    {vacancy.what_we_offer && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Мы предлагаем:</h2>
                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                {vacancy.what_we_offer.split('\n').map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-center mt-6">
                <Link to="/vacancies" className="text-blue-600 hover:underline">
                    &larr; Вернуться к списку вакансий
                </Link>
            </div>
        </>
    );
};

export default VacancyDetailPage;