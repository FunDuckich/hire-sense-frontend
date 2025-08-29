import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { useParams } from 'react-router-dom';

const mockVacancy = {
  id: 1,
  title: 'Бизнес-аналитик',
  company: 'Yandex',
  location: 'Москва, Пресненская, 10',
  employmentType: 'Полная занятость, Постоянно',
  salary: 'Не указана',
  responsibilities: [
    'Управление комплексом Системы противодействия мошенничеству.',
    'Формирование предложений по оптимизации и улучшению правил антифрод-мониторинга.',
    'Анализ и формирование функциональных и бизнес-требований.',
    'Участие в разработке тест-кейсов и функциональных тестированиях.',
  ],
  requirements: [
    'Высшее техническое или экономическое образование.',
    'Уверенное владение Microsoft Office (Word, Excel, PowerPoint).',
    'Навыки подготовки бизнес-требований к развитию систем.',
    'Будет преимуществом: опыт работы с ПО в области антифрод.',
  ],
  offers: [
    '5-дневная рабочая неделя в комфортном офисе.',
    'Годовое премирование по результатам работы.',
    'ДМС со стоматологией.',
    'Возможности для профессионального роста и обучения.',
  ],
};

const VacancyDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">{mockVacancy.title}</h1>
              <p className="mt-1 text-lg text-gray-600">{mockVacancy.company}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-blue-600">{mockVacancy.salary}</p>
              <p className="text-sm text-gray-500 mt-1">{mockVacancy.location}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Обязанности:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {mockVacancy.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Требования:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {mockVacancy.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Что мы предлагаем:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {mockVacancy.offers.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <div className="max-w-xs mx-auto">
               <Button>Откликнуться</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VacancyDetailPage;