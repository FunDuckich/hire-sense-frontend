import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';
import Textarea from '../components/Textarea';

const CreateVacancyPage = () => {
  const [criteria, setCriteria] = useState([{ id: 1, criterion: '', weight: '' }]);

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Создание новой вакансии</h1>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
               <Button type="button">Загрузить из PDF/DOCX</Button>
            </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input id="job_title" label="Название должности" placeholder="Бизнес-аналитик" />
                <Input id="location" label="Город или формат работы" placeholder="Москва, гибрид" />
              </div>
              
              <Textarea id="key_responsibilities" label="Ключевые обязанности" placeholder="- Управление системой X&#10;- Формирование требований" />
              <Textarea id="hard_skills" label="Требуемые Hard Skills" placeholder="- SQL&#10;- Python" />
              <Textarea id="soft_skills" label="Желаемые Soft Skills (опционально)" placeholder="- Коммуникабельность&#10;- Работа в команде" />

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Ключевые критерии оценки</h2>
                <div className="space-y-4">
                  {criteria.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="flex-grow">
                        <Input id={`criterion-${item.id}`} label="Критерий" value={item.criterion} onChange={(e) => handleCriterionChange(item.id, 'criterion', e.target.value)} placeholder="Знание SQL" />
                      </div>
                      <div className="w-24">
                        <Input id={`weight-${item.id}`} label="Вес (%)" type="number" value={item.weight} onChange={(e) => handleCriterionChange(item.id, 'weight', e.target.value)} placeholder="50" />
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
                <div className="max-w-xs ml-auto">
                  <Button type="submit">Сохранить вакансию</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateVacancyPage;