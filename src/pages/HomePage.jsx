import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        <section className="text-center py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800">
            Найм будущего начинается здесь
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Наша AI-платформа проводит первичные собеседования, экономит время HR и предоставляет кандидатам удобный формат интервью 24/7.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link 
              to="/vacancies" 
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Найти вакансию
            </Link>
            <Link 
              to="/hr/register" 
              className="bg-gray-200 text-gray-800 py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Разместить вакансию
            </Link>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800">Как это работает?</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl text-blue-600 font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Создайте вакансию</h3>
                <p className="text-gray-600">
                  HR-менеджер создает вакансию и определяет ключевые критерии оценки.
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl text-blue-600 font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">AI проводит интервью</h3>
                <p className="text-gray-600">
                  Кандидат проходит голосовое интервью с AI-аватаром в любое удобное время.
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl text-blue-600 font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Получите отчет</h3>
                <p className="text-gray-600">
                  Система анализирует ответы и формирует детальный отчет с оценкой кандидата.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;