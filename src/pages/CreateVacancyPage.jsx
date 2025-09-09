import {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import {createVacancy, parseVacancyFromFile} from '../api/vacancyApi';

const CreateVacancyPage = () => {
    const [formData, setFormData] = useState({
        job_title: '',
        company_name: '',
        location: '',
        key_responsibilities: '',
        hard_skills: '',
        soft_skills: '',
    });
    const [criteria, setCriteria] = useState([{id: Date.now(), criterion: '', weight: 100}]);
    const [totalWeight, setTotalWeight] = useState(100);
    const [isParsing, setIsParsing] = useState(false);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    useEffect(() => {
        const sum = criteria.reduce((acc, curr) => acc + (Number(curr.weight) || 0), 0);
        setTotalWeight(sum);
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

                const updatedFields = {};
                for (const key in otherFields) {
                    if (otherFields[key] !== null && otherFields[key] !== undefined) {
                        updatedFields[key] = otherFields[key];
                    }
                }
                setFormData(prev => ({...prev, ...updatedFields}));

                if (evaluation_criteria && Array.isArray(evaluation_criteria) && evaluation_criteria.length > 0) {
                    const newCriteria = evaluation_criteria.map((crit, index) => ({
                        ...crit,
                        id: Date.now() + index
                    }));
                    setCriteria(newCriteria);
                }
            }

            toast.success('Данные успешно извлечены!', {id: toastId});
        } catch (error) {
            const errorMessage = error.response?.data?.detail || 'Не удалось извлечь данные из файла.';
            toast.error(errorMessage, {id: toastId});
        } finally {
            setIsParsing(false);
            if (event.target) {
                event.target.value = null;
            }
        }
    };

    const handleAddCriterion = () => {
        setCriteria([...criteria, {id: Date.now(), criterion: '', weight: ''}]);
    };

    const handleRemoveCriterion = (id) => {
        setCriteria(criteria.filter(c => c.id !== id));
    };

    const handleCriterionChange = (id, field, value) => {
        setCriteria(criteria.map(c => c.id === id ? {...c, [field]: value} : c));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (totalWeight !== 100) {
            toast.error('Сумма весов всех критериев должна быть ровно 100%.');
            return;
        }

        const payload = {
            ...formData,
            evaluation_criteria: criteria.filter(c => c.criterion).map(({criterion, weight}) => ({
                criterion,
                weight: Number(weight) || 0
            })),
        };

        try {
            await createVacancy(payload);
            toast.success('Вакансия успешно создана!');
            navigate('/hr/vacancies');
        } catch (error) {
            toast.error('Не удалось создать вакансию. Проверьте поля.');
        }
    };

    return (
        <div className="flex flex-col flex-grow overflow-hidden">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 shrink-0">Создание новой вакансии</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input id="job_title" label="Название должности" placeholder="Senior Python Developer"
                               value={formData.job_title} onChange={handleFormChange} required/>
                        <Input id="company_name" label="Название компании" placeholder="HireSense Inc."
                               value={formData.company_name} onChange={handleFormChange}/>
                        <Input id="location" label="Город или формат работы" placeholder="Москва, гибрид"
                               value={formData.location} onChange={handleFormChange}/>
                    </div>
                    <Textarea id="key_responsibilities" label="Ключевые обязанности" placeholder="- Разработка API..."
                              rows={5} value={formData.key_responsibilities} onChange={handleFormChange}/>
                    <Textarea id="hard_skills" label="Требуемые Hard Skills" placeholder="- Python, FastAPI..." rows={5}
                              value={formData.hard_skills} onChange={handleFormChange}/>
                    <Textarea id="soft_skills" label="Желаемые Soft Skills (опционально)"
                              placeholder="- Работа в команде..." rows={3} value={formData.soft_skills}
                              onChange={handleFormChange}/>
                </div>
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm flex flex-col overflow-hidden">
                    <div className="shrink-0 mb-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.docx,.doc"
                        />
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            disabled={isParsing}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isParsing ? 'Анализ...' : 'Загрузить из PDF/DOCX'}
                        </button>
                    </div>
                    <div className="border-t pt-4 flex flex-col flex-grow overflow-hidden">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 shrink-0">Ключевые критерии оценки</h2>
                        <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
                            {criteria.map((item) => (
                                <div key={item.id} className="flex items-end gap-2">
                                    <div className="flex-grow">
                                        <Input id={`criterion-${item.id}`} label="Критерий" value={item.criterion}
                                               onChange={(e) => handleCriterionChange(item.id, 'criterion', e.target.value)}
                                               placeholder="Знание SQL"/>
                                    </div>
                                    <div className="w-24 shrink-0">
                                        <Input id={`weight-${item.id}`} label="Вес (%)" type="number"
                                               value={item.weight}
                                               onChange={(e) => handleCriterionChange(item.id, 'weight', e.target.value)}
                                               placeholder="50"/>
                                    </div>
                                    {criteria.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveCriterion(item.id)}
                                                className="text-red-500 h-10 mb-1 shrink-0">Удалить</button>
                                    )}
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
                        <Button type="submit">Сохранить вакансию</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateVacancyPage;