import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';

const CreateVacancyPage = () => {
  const [criteria, setCriteria] = useState([{ id: 1, criterion: '', weight: 50 }]);
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
    toast.success('Вакансия успешно создана!');
    console.log('Форма отправлена!');
  };

  return (
    <div className="flex flex-col flex-grow overflow-hidden">
      <div className="flex justify-between items-center mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">Создание новой вакансии</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
        
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm space-y-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input id="job_title" label="Название должности" placeholder="Бизнес-аналитик" />
            <Input id="company_name" label="Название компании" placeholder="ООО Ромашка" />
            <Input id="location" label="Город или формат работы" placeholder="Москва, гибрид" />
          </div>
          <Textarea id="key_responsibilities" label="Ключевые обязанности" placeholder="- Управление системой X&#10;- Формирование требований" rows={5} />
          <Textarea id="hard_skills" label="Требуемые Hard Skills" placeholder="- SQL&#10;- Python" rows={5} />
          <Textarea id="soft_skills" label="Желаемые Soft Skills (опционально)" placeholder="- Коммуникабельность&#10;- Работа в команде" rows={3} />
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
                    <Input id={`criterion-${item.id}`} label="Критерий" value={item.criterion} onChange={(e) => handleCriterionChange(item.id, 'criterion', e.target.value)} placeholder="Знание SQL" />
                  </div>
                  <div className="w-24 shrink-0">
                    <Input id={`weight-${item.id}`} label="Вес (%)" type="number" value={item.weight} onChange={(e) => handleCriterionChange(item.id, 'weight', e.target.value)} placeholder="50" />
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
          
          <div className="mt-auto pt-4 border-t shrink-0">
            <Button type="submit">Сохранить вакансию</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateVacancyPage;