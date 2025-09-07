import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    ]
};

const EditVacancyPage = () => {
  const [criteria, setCriteria] = useState(mockVacancy.evaluation_criteria);

  const handleAddCriterion = () => {
    const newId = criteria.length > 0 ? Math.max(...criteria.map(c => c.id)) + 1 : 1;
    setCriteria([...criteria, { id: newId, criterion: '', weight: '' }]);
  };

  const handleRemoveCriterion = (id) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const handleCriterionChange = (id, field, value) => {
    setCriteria(criteria.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/hr/vacancies" className="text-blue-600 hover:underline">
          &larr; К списку вакансий
        </Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Редактирование вакансии</h1>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input id="job_title" label="Название должности" defaultValue={mockVacancy.job_title} />
            <Input id="company_name" label="Название компании" defaultValue={mockVacancy.company_name} />
          </div>
          <Input id="location" label="Город или формат работы" defaultValue={mockVacancy.location} />
          
          <Textarea id="key_responsibilities" label="Ключевые обязанности" defaultValue={mockVacancy.key_responsibilities} />
          <Textarea id="hard_skills" label="Требуемые Hard Skills" defaultValue={mockVacancy.hard_skills} />
          <Textarea id="soft_skills" label="Желаемые Soft Skills (опционально)" defaultValue={mockVacancy.soft_skills} />

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Ключевые критерии оценки</h2>
            <div className="space-y-4">
              {criteria.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex-grow">
                    <Input id={`criterion-${item.id}`} label="Критерий" value={item.criterion} onChange={(e) => handleCriterionChange(item.id, 'criterion', e.target.value)} />
                  </div>
                  <div className="w-24">
                    <Input id={`weight-${item.id}`} label="Вес (%)" type="number" value={item.weight} onChange={(e) => handleCriterionChange(item.id, 'weight', e.target.value)} />
                  </div>
                  <button type="button" onClick={() => handleRemoveCriterion(item.id)} className="text-red-500 hover:text-red-700 mt-7">
                    Удалить
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddCriterion} className="mt-4 text-blue-600 font-semibold hover:text-blue-800">
              + Добавить критерий
            </button>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex justify-end gap-4">
              <Button type="button" className="bg-red-600 hover:bg-red-700">Архивировать</Button>
              <Button type="submit">Сохранить изменения</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVacancyPage;