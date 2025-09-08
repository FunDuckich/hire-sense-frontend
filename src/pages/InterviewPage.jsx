import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import EqualizerIcon from '../components/EqualizerIcon';
import Button from '../components/Button';
import { startInterviewSession } from '../api/applicationApi';
import useAuthStore from '../stores/useAuthStore';

const InterviewPage = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthStore();
  
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const ws = useRef(null);
  const mediaRecorder = useRef(null);

  useEffect(() => {
    const setupInterview = async () => {
      try {
        const data = await startInterviewSession(applicationId);
        setSessionId(data.interview_session_id);
      } catch (error) {
        toast.error('Не удалось начать сессию интервью. Возможно, ссылка истекла.');
        navigate('/my-applications');
      }
    };
    if (applicationId) {
        setupInterview();
    }
  }, [applicationId, navigate]);

  useEffect(() => {
    if (!sessionId || !token) return;

    const wsUrl = `ws://localhost:8000/api/v1/ws/${sessionId}?token=${encodeURIComponent(token)}`;
    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      startRecording();
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'avatar_speech') {
        setIsAiSpeaking(true);
        setMessages(prev => [...prev, { role: 'assistant', text: message.text }]);
        const audio = new Audio(`data:audio/ogg;base64,${message.audio_b64}`);
        audio.play();
        audio.onended = () => setIsAiSpeaking(false);
      } else if (message.type === 'final_refinement') {
        setMessages(prev => [...prev, { role: 'user', text: message.text }]);
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      stopRecording();
      toast.success('Интервью завершено!');
      setTimeout(() => navigate('/my-applications'), 2000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('Произошла ошибка соединения.');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      stopRecording();
    };
  }, [sessionId, token, navigate]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0 && ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(event.data);
        }
      };
      
      mediaRecorder.current.onstart = () => setIsListening(true);
      mediaRecorder.current.onstop = () => {
        setIsListening(false);
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({ type: 'stream_end' }));
        }
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.current.start(500);
    } catch (error) {
      toast.error('Не удалось получить доступ к микрофону.');
      console.error('Microphone access error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
  };

  const handleEndInterview = () => {
    if (ws.current) {
      ws.current.close();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col p-4 min-h-0">
        <div className="flex-grow flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex-grow p-6 space-y-6 overflow-y-auto">
            {messages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} text={msg.text} />
            ))}
            {!isConnected && sessionId && <div className="text-center text-gray-500">Подключение...</div>}
          </div>

          <div className="p-6 bg-gray-50 border-t flex flex-col items-center justify-center gap-4">
            <EqualizerIcon isListening={isListening} />
            <div className="w-full max-w-xs">
              <Button type="button" onClick={handleEndInterview} disabled={!isConnected}>
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