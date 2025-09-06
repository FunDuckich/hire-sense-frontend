import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import MicrophoneIcon from '../components/MicrophoneIcon';

const mockMessages = [
  { role: 'assistant', text: 'Здравствуйте, Иван! Я — ваш AI-рекрутер. Готовы начать наше интервью?' },
  { role: 'user', text: 'Да, здравствуйте. Я готов.' },
  { role: 'assistant', text: 'Отлично. Расскажите, пожалуйста, о вашем самом успешном проекте на предыдущем месте работы.' },
  { role: 'user', text: 'Это был проект по внедрению новой антифрод-системы. Мы смогли снизить количество мошеннических операций на 15% за квартал.' },
];

const InterviewPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-hidden">
        
        <div className="bg-gray-900 rounded-lg flex items-center justify-center">
          <div className="w-64 h-64 bg-blue-500 rounded-full animate-pulse">
          </div>
        </div>

        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex-grow p-6 space-y-6 overflow-y-auto flex flex-col-reverse">
            {mockMessages.slice().reverse().map((msg, index) => (
              <ChatMessage key={index} role={msg.role} text={msg.text} />
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t flex items-center justify-center">
            <MicrophoneIcon isListening={true} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;