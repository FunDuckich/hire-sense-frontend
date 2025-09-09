import {useState, useEffect, useRef} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import {getVacancyById, updateVacancy, parseVacancyFromFile} from '../api/vacancyApi';

const EditVacancyPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [criteria, setCriteria] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isParsing, setIsParsing] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchVacancy = async () => {
            try {
                const data = await getVacancyById(id);
                setFormData(data);
                setCriteria(data.evaluation_criteria.map((c, i) => ({...c, localId: i})));
            } catch (error) {
                toast.error("Не удалось загрузить данные вакансии.");
                navigate('/hr/vacancies');
            } finally {
                setIsLoading(false);
            }
        };
        fetchVacancy();
    }, [id, navigate]);

    useEffect(() => {
        if (criteria) {
            const sum = criteria.reduce((acc, curr) => acc + (Number(curr.weight) || 0), 0);
            setTotalWeight(sum);
        }
    }, [criteria]);

    const handleFormChange = (e) => {
        const {id, value} = e.target;
        setFormData(prev => ({...prev, [id]: value}));
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setIsParsing(true);
        const toastId = toast.loading('Анализируем файл...');
        try {
            const parsedData = await parseVacancyFromFile(file);
            if (parsedData) {
                const {evaluation_criteria, ...otherFields} = parsedData;
                setFormData(prev => {
                    const updatedFields = {...prev, ...otherFields};
                    if (!otherFields.currency || !['RUB', 'USD', 'EUR'].includes(otherFields.currency.toUpperCase())) {
                        updatedFields.currency = prev.currency;
                    } else {
                        updatedFields.currency = otherFields.currency.toUpperCase();
                    }
                    return updatedFields;
                });
                if (evaluation_criteria && Array.isArray(evaluation_criteria) && evaluation_criteria.length > 0) {
                    setCriteria(evaluation_criteria.map((crit, index) => ({...crit, localId: Date.now() + index})));
                }
            }
            toast.success('Данные успешно извлечены!', {id: toastId});
        } catch (error) {
            toast.error('Не удалось извлечь данные из файла.', {id: toastId});
        } finally {
            setIsParsing(false);
            if (event.target) event.target.value = null;
        }
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
        if (totalWeight !== 100 && criteria.some(c => c.criterion)) {
            toast.error('Сумма весов всех критериев должна быть ровно 100%.');
            return;
        }
        const dataToSend = {...formData};
        if (Array.isArray(dataToSend.key_responsibilities)) dataToSend.key_responsibilities = dataToSend.key_responsibilities.join('\n');
        if (Array.isArray(dataToSend.hard_skills)) dataToSend.hard_skills = dataToSend.hard_skills.join('\n');
        if (Array.isArray(dataToSend.soft_skills)) dataToSend.soft_skills = dataToSend.soft_skills.join('\n');
        const payload = {
            ...dataToSend,
            salary_from: dataToSend.salary_from ? Number(dataToSend.salary_from) : null,
            salary_to: dataToSend.salary_to ? Number(dataToSend.salary_to) : null,
            evaluation_criteria: criteria.filter(c => c.criterion?.trim()).map(({criterion, weight}) => ({
                criterion,
                weight: parseInt(weight, 10) || 0
            })),
        };
        try {
            await updateVacancy(id, payload);
            toast.success('Вакансия успешно обновлена!');
            navigate('/hr/vacancies');
        } catch (error) {
            toast.error('Не удалось обновить вакансию.');
        }
    };

    if (isLoading || !formData) {
        return <div className="text-center py-12">Загрузка вакансии...</div>;
    }

    return (
        <div className="flex flex-col flex-grow overflow-hidden">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 shrink-0">Редактирование вакансии</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input id="job_title" label="Название должности" value={formData.job_title || ''}
                               onChange={handleFormChange} required/>
                        <Input id="company_name" label="Название компании" value={formData.company_name || ''}
                               onChange={handleFormChange}/>
                        <Input id="location" label="Город или формат работы" value={formData.location || ''}
                               onChange={handleFormChange}/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="md:col-span-2">
                            <Input id="salary_from" label="Зарплата от" type="number" placeholder="100000"
                                   value={formData.salary_from || ''} onChange={handleFormChange}/>
                        </div>
                        <div className="md:col-span-2">
                            <Input id="salary_to" label="Зарплата до" type="number" placeholder="150000"
                                   value={formData.salary_to || ''} onChange={handleFormChange}/>
                        </div>
                        <div className="md:col-span-1">
                            <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Валюта</label>
                            <select id="currency" name="currency" value={formData.currency || 'RUB'}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                                <option>RUB</option>
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                        </div>
                    </div>
                    <Textarea id="key_responsibilities" label="Ключевые обязанности" rows={5}
                              value={formData.key_responsibilities || ''} onChange={handleFormChange}/>
                    <Textarea id="hard_skills" label="Требуемые Hard Skills" rows={5} value={formData.hard_skills || ''}
                              onChange={handleFormChange}/>
                    <Textarea id="soft_skills" label="Желаемые Soft Skills" rows={3} value={formData.soft_skills || ''}
                              onChange={handleFormChange}/>
                </div>
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm flex flex-col">
                    <div className="shrink-0 mb-4">
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden"
                               accept=".pdf,.docx,.doc"/>
                        <Button type="button" variant="secondary" onClick={handleUploadClick} disabled={isParsing}>
                            {isParsing ? 'Анализ...' : 'Обновить из PDF/DOCX'}
                        </Button>
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
                                                className="text-red-500 h-10 mb-1 shrink-0">Удалить</button>)}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between items-center shrink-0">
                            <button type="button" onClick={handleAddCriterion}
                                    className="text-blue-600 font-semibold hover:text-blue-800">+ Добавить критерий
                            </button>
                            <span
                                className={`font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-500'}`}>{totalWeight}%</span>
                        </div>
                    </div>
                    <div className="mt-auto pt-4 border-t shrink-0">
                        <Button type="button" onClick={handleSubmit}>Сохранить изменения</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditVacancyPage;