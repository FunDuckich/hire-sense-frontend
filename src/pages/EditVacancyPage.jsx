import {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import {getVacancyById, updateVacancy} from '../api/vacancyApi';

const EditVacancyPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [criteria, setCriteria] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const data = await getVacancyById(id);
                setFormData(data);
                setCriteria(data.evaluation_criteria.map((c, i) => ({...c, localId: i})));
            } catch (error) {
                toast.error("Не удалось загрузить данные вакансии.");
                console.error('Failed to update vacancy:', error);
                navigate('/hr/vacancies');
            } finally {
                setIsLoading(false);
            }
        };
        fetchVacancy();
    }, [id, navigate]);

    useEffect(() => {
        const sum = criteria.reduce((acc, curr) => acc + (Number(curr.weight) || 0), 0);
        setTotalWeight(sum);
    }, [criteria]);

    const handleFormChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const handleAddCriterion = () => {
        setCriteria([...criteria, {localId: Date.now(), criterion: '', weight: ''}]);
    };

    const handleRemoveCriterion = (localId) => {
        setCriteria(criteria.filter(c => c.localId !== localId));
    };

    const handleCriterionChange = (localId, field, value) => {
        setCriteria(criteria.map(c => c.localId === localId ? {...c, [field]: value} : c));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (totalWeight !== 100) {
            toast.error('Сумма весов всех критериев должна быть ровно 100%.');
            return;
        }

        const payload = {
            ...formData,
            evaluation_criteria: criteria.map(({criterion, weight}) => ({
                criterion,
                weight: Number(weight)
            })),
        };

        try {
            await updateVacancy(id, payload);
            toast.success('Вакансия успешно обновлена!');
            navigate('/hr/vacancies');
        } catch (error) {
            toast.error('Не удалось обновить вакансию.');
            console.error('Failed to update vacancy:', error);
        }
    };

    if (isLoading || !formData) {
        return <div className="text-center py-12">Загрузка вакансии...</div>;
    }

    return (
        <div className="flex flex-col flex-grow overflow-hidden">
            <div className="flex justify-between items-center mb-4 shrink-0">
                <h1 className="text-2xl font-bold text-gray-800">Редактирование вакансии</h1>
                <Link to="/hr/vacancies" className="text-blue-600 hover:underline">
                    &larr; К списку вакансий
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">

                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input id="job_title" label="Название должности" value={formData.job_title || ''}
                               onChange={handleFormChange}/>
                        <Input id="company_name" label="Название компании" value={formData.company_name || ''}
                               onChange={handleFormChange}/>
                        <Input id="location" label="Город или формат работы" value={formData.location || ''}
                               onChange={handleFormChange}/>
                    </div>
                    <Textarea id="key_responsibilities" label="Ключевые обязанности" rows={5}
                              value={formData.key_responsibilities || ''} onChange={handleFormChange}/>
                    <Textarea id="hard_skills" label="Требуемые Hard Skills" rows={5} value={formData.hard_skills || ''}
                              onChange={handleFormChange}/>
                    <Textarea id="soft_skills" label="Желаемые Soft Skills (опционально)" rows={3}
                              value={formData.soft_skills || ''} onChange={handleFormChange}/>
                </div>

                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm flex flex-col overflow-hidden">
                    <div className="shrink-0 mb-4">
                        <Button type="button" variant="secondary" className="w-full">Загрузить из PDF/DOCX</Button>
                    </div>

                    <div className="border-t pt-4 flex flex-col flex-grow overflow-hidden">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 shrink-0">Ключевые критерии оценки</h2>

                        <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                            {criteria.map((item) => (
                                <div key={item.localId} className="flex items-end gap-2">
                                    <div className="flex-grow">
                                        <Input id={`criterion-${item.localId}`} label="Критерий" value={item.criterion}
                                               onChange={(e) => handleCriterionChange(item.localId, 'criterion', e.target.value)}/>
                                    </div>
                                    <div className="w-24 shrink-0">
                                        <Input id={`weight-${item.localId}`} label="Вес (%)" type="number"
                                               value={item.weight}
                                               onChange={(e) => handleCriterionChange(item.localId, 'weight', e.target.value)}/>
                                    </div>
                                    {criteria.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveCriterion(item.localId)}
                                                className="text-red-500 h-10 mb-1 shrink-0">
                                            Удалить
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-between items-center shrink-0">
                            <button type="button" onClick={handleAddCriterion}
                                    className="text-blue-600 font-semibold hover:text-blue-800">
                                + Добавить критерий
                            </button>
                            <span className={`font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-500'}`}>
                {totalWeight}%
              </span>
                        </div>
                    </div>

                    <div className="mt-auto pt-4 border-t shrink-0 space-y-2">
                        <Button type="submit">Сохранить изменения</Button>
                        <Button type="button" variant="secondary"
                                className="bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500">Архивировать</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditVacancyPage;