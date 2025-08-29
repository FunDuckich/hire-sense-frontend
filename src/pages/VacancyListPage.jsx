import Header from '../components/Header';
import Footer from '../components/Footer';
import VacancyCard from '../components/VacancyCard';

const mockVacancies = [
  {
    id: 1,
    title: 'Бизнес-аналитик',
    company: 'Yandex',
    location: 'Москва',
    tags: ['Антифрод', 'SQL', 'Fintech'],
  },
  {
    id: 2,
    title: 'Ведущий специалист ИТ',
    company: 'SberTech',
    location: 'Санкт-Петербург',
    tags: ['Серверное оборудование', 'LAN/SAN', 'x86'],
  },
  {
    id: 3,
    title: 'Frontend Developer (React)',
    company: 'VK',
    location: 'Москва (Гибрид)',
    tags: ['React', 'TypeScript', 'Highload'],
  },
  {
    id: 4,
    title: 'Product Manager',
    company: 'Ozon',
    location: 'Удаленно',
    tags: ['CJM', 'Agile', 'E-commerce'],
  },
];

const VacancyListPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Актуальные вакансии</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Фильтры</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700">Поиск по названию</label>
                  <input type="text" id="search" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Город</label>
                  <select id="location" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Любой</option>
                    <option>Москва</option>
                    <option>Санкт-Петербург</option>
                    <option>Удаленно</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>
          
          <section className="w-full md:w-3/4">
            <div className="grid grid-cols-1 gap-6">
              {mockVacancies.map((vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  id={vacancy.id}
                  title={vacancy.title}
                  company={vacancy.company}
                  location={vacancy.location}
                  tags={vacancy.tags}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VacancyListPage;