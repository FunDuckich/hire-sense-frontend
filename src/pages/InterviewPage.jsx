import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import EqualizerIcon from '../components/EqualizerIcon';
import Button from '../components/Button';

const mockMessages = [
  { role: 'assistant', text: 'Здравствуйте, Иван! Я — ваш AI-рекрутер. Готовы начать наше интервью?' },
  { role: 'user', text: 'Да, здравствуйте. Я готов.' },
  { role: 'assistant', text: 'Отлично. Расскажите, пожалуйста, о вашем самом успешном проекте на предыдущем месте работы.' },
];

const InterviewPage = () => {
  const handleEndInterview = () => {
    console.log("Интервью завершено");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col p-4 min-h-0">
        
        <div className="flex-grow flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex-grow p-6 space-y-6 overflow-y-auto">
            {mockMessages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} text={msg.text} />
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t flex flex-col items-center justify-center gap-4">
            <EqualizerIcon isListening={true} />
            <div className="w-full max-w-xs">
              <Button type="button" onClick={handleEndInterview}>
                Завершить интервью
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewPage;