import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import useAuthStore from '../stores/useAuthStore';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const StepCard = ({ number, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-left h-full">
      <span className="text-4xl font-bold text-blue-600">{number}</span>
      <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-base text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-col flex-grow">
      <div className="relative overflow-hidden flex-grow flex items-center justify-center">
        
        <div className={`absolute inset-0 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out ${showHowItWorks ? '-translate-x-full' : 'translate-x-0'}`}>
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Найдите работу мечты</span>
              <span className="block text-blue-600">с помощью AI</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Наш AI-рекрутер проведет первичное собеседование, оценит ваши навыки и поможет найти идеальное совпадение с вакансией.
            </p>
            <div className="mt-8 flex justify-center items-center gap-4">
              <Link to="/vacancies">
                <Button className="py-4 px-10 text-xl font-semibold">
                  Найти вакансию
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/hr/register">
                  <Button variant="secondary" className="py-3 px-6 text-base">
                    Разместить вакансию
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className={`absolute inset-0 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out p-4 ${showHowItWorks ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-gray-800">Как это работает</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Простой и прозрачный процесс для кандидатов и HR-специалистов.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <StepCard number="01" title="Откликнитесь" description="Выберите позицию и отправьте резюме. Наша система проведет первичный анализ." />
              <StepCard number="02" title="Пройдите AI-интервью" description="Получите приглашение на голосовое интервью с AI-аватаром в удобное для вас время." />
              <StepCard number="03" title="Получите результат" description="HR-менеджер получит детальный отчет о ваших навыках, что ускорит процесс найма." />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-4">
        <button 
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showHowItWorks ? '← Вернуться' : 'Узнать, как это работает'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;