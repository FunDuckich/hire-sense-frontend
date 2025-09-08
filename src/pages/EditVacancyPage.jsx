import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';

const mockVacancy = {
    job_title: "Бизнес-аналитик",
    company_name: "ООО Ромашка",
    location: "Москва, гибрид",
    key_responsibilities: "- Управление системой X\n- Формирование требований",
    hard_skills: "- SQL\n- Python",
    soft_skills: "- Коммуникабельность\n- Работа в команде",
    evaluation_criteria: [
        { id: 1, criterion: 'Знание SQL', weight: 50 },
        { id: 2, criterion: 'Опыт в финтехе', weight: 30 },
        { id: 3, criterion: 'Работа с Jira', weight: 20 },
    ]
};

const EditVacancyPage = () => {
  const [criteria, setCriteria] = useState(mockVacancy.evaluation_criteria);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const sum = criteria.reduce((acc, curr) => acc + (Number(curr.weight) || 0), 0);
    setTotalWeight(sum);
  }, [criteria]);

  const handleAddCriterion = () => {
    setCriteria([...criteria, { id: criteria.length + 2, criterion: '', weight: '' }]);
  };

  const handleRemoveCriterion = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const handleCriterionChange = (id, field, value) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalWeight !== 100) {
      toast.error('Сумма весов всех критериев должна быть ровно 100%.');
      return;
    }
    toast.success('Вакансия успешно обновлена!');
    console.log('Форма отправлена!');
  };

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
            <Input id="job_title" label="Название должности" defaultValue={mockVacancy.job_title} />
            <Input id="company_name" label="Название компании" defaultValue={mockVacancy.company_name} />
            <Input id="location" label="Город или формат работы" defaultValue={mockVacancy.location} />
          </div>
          <Textarea id="key_responsibilities" label="Ключевые обязанности" defaultValue={mockVacancy.key_responsibilities} rows={5} />
          <Textarea id="hard_skills" label="Требуемые Hard Skills" defaultValue={mockVacancy.hard_skills} rows={5} />
          <Textarea id="soft_skills" label="Желаемые Soft Skills (опционально)" defaultValue={mockVacancy.soft_skills} rows={3} />
        </div>

        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm flex flex-col overflow-hidden">
          <div className="shrink-0 mb-4">
            <Button type="button" variant="secondary" className="w-full">Загрузить из PDF/DOCX</Button>
          </div>
          
          <div className="border-t pt-4 flex flex-col flex-grow overflow-hidden">
            <h2 className="text-xl font-bold text-gray-800 mb-4 shrink-0">Ключевые критерии оценки</h2>
            
            <div className="space-y-4 overflow-y-auto pr-2 flex-grow">
              {criteria.map((item) => (
                <div key={item.id} className="flex items-end gap-2">
                  <div className="flex-grow">
                    <Input id={`criterion-${item.id}`} label="Критерий" defaultValue={item.criterion} onChange={(e) => handleCriterionChange(item.id, 'criterion', e.target.value)} />
                  </div>
                  <div className="w-24 shrink-0">
                    <Input id={`weight-${item.id}`} label="Вес (%)" type="number" defaultValue={item.weight} onChange={(e) => handleCriterionChange(item.id, 'weight', e.target.value)} />
                  </div>
                  {criteria.length > 1 && (
                    <button type="button" onClick={() => handleRemoveCriterion(item.id)} className="text-red-500 h-10 mb-1 shrink-0">
                      Удалить
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center shrink-0">
              <button type="button" onClick={handleAddCriterion} className="text-blue-600 font-semibold hover:text-blue-800">
                + Добавить критерий
              </button>
              <span className={`font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-500'}`}>
                {totalWeight}%
              </span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t shrink-0 space-y-2">
            <Button type="submit">Сохранить изменения</Button>
            <Button type="button" variant="secondary" className="bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-500">Архивировать</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVacancyPage;