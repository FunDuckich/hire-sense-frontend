import {useState, useEffect, useRef, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import useAuthStore from '../stores/useAuthStore';
import {startInterviewSession} from '../api/applicationApi';

const InterviewPage = () => {
    const {id: applicationId} = useParams();
    const navigate = useNavigate();
    const {token} = useAuthStore();

    const [status, setStatus] = useState('CONNECTING');
    const [messages, setMessages] = useState([]);
    const [partialText, setPartialText] = useState('');

    const ws = useRef(null);
    const audioContext = useRef(null);
    const streamRef = useRef(null);
    const workletNodeRef = useRef(null);
    const sourceNodeRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, partialText]);

    const stopRecording = useCallback(() => {
        if (!streamRef.current) return;
        streamRef.current.getTracks().forEach(track => track.stop());
        workletNodeRef.current?.disconnect();
        sourceNodeRef.current?.disconnect();
        streamRef.current = workletNodeRef.current = sourceNodeRef.current = null;
    }, []);

    const startRecording = useCallback(async () => {
        try {
            if (!audioContext.current) audioContext.current = new AudioContext({sampleRate: 48000});
            if (audioContext.current.state === 'suspended') await audioContext.current.resume();

            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            streamRef.current = stream;

            await audioContext.current.audioWorklet.addModule('/audio-processor.js');
            const workletNode = new AudioWorkletNode(audioContext.current, 'audio-processor');

            workletNode.port.onmessage = (event) => {
                if (ws.current?.readyState === WebSocket.OPEN && event.data instanceof ArrayBuffer) {
                    ws.current.send(event.data);
                }
            };

            const source = audioContext.current.createMediaStreamSource(stream);
            source.connect(workletNode);
            workletNodeRef.current = workletNode;
            sourceNodeRef.current = source;
        } catch (error) {
            toast.error('Не удалось получить доступ к микрофону.');
        }
    }, []);

    useEffect(() => {
        if (status === 'LISTENING' && !streamRef.current) {
            startRecording();
        } else if (status !== 'LISTENING' && streamRef.current) {
            stopRecording();
        }
    }, [status, startRecording, stopRecording]);

    useEffect(() => {
        if (!applicationId || !token) return;
        let localWs;

        const connect = async () => {
            try {
                const {interview_session_id} = await startInterviewSession(applicationId);
                const wsUrl = `ws://localhost:8000/api/v1/ws/${interview_session_id}?token=${encodeURIComponent(token)}`;
                localWs = new WebSocket(wsUrl);
                ws.current = localWs;

                localWs.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    if (message.type === 'avatar_speech') {
                        setStatus('AI_SPEAKING');
                        setPartialText('');
                        setMessages(prev => [...prev, {role: 'assistant', text: message.text}]);
                        const audio = new Audio(`data:audio/ogg;base64,${message.audio_b64}`);
                        audio.play();
                        audio.onended = () => setStatus('LISTENING');
                    } else if (message.type === 'partial') {
                        setPartialText(message.text);
                    } else if (message.type === 'final_refinement') {
                        setStatus('PROCESSING');
                        setPartialText('');
                        if (message.text) setMessages(prev => [...prev, {role: 'user', text: message.text}]);
                    }
                };
                localWs.onclose = () => {
                    setStatus('FINISHED');
                    setTimeout(() => navigate('/my-applications'), 2000);
                };
                localWs.onerror = () => setStatus('ERROR');
            } catch (error) {
                setStatus('ERROR');
                toast.error('Не удалось начать сессию.');
                navigate('/my-applications');
            }
        };

        connect();
        return () => {
            if (localWs) localWs.close();
            stopRecording();
        };
    }, [applicationId, token, navigate, startRecording, stopRecording]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <Header/>
            <main className="flex-grow flex flex-col p-4 min-h-0">
                <div className="flex-grow flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                    <div ref={chatContainerRef} className="flex-grow p-6 space-y-6 overflow-y-auto">
                        {messages.map((msg, index) => <ChatMessage key={index} role={msg.role} text={msg.text}/>)}
                        {partialText && <ChatMessage role="user" text={partialText}/>}
                    </div>
                    <div className="p-6 bg-gray-50 border-t flex flex-col items-center justify-center gap-4 h-28">
                        <div className="h-6">
                            {status === 'AI_SPEAKING' && <p>Аватар говорит...</p>}
                            {status === 'LISTENING' &&
                                <p className="font-bold text-blue-600 animate-pulse">Слушаю вас...</p>}
                            {status === 'PROCESSING' && <p>Анализ ответа...</p>}
                            {status === 'FINISHED' && <p className="font-bold text-green-600">Интервью завершено.</p>}
                            {status === 'ERROR' && <p className="font-bold text-red-600">Ошибка соединения.</p>}
                        </div>
                        <button onClick={() => ws.current?.close()} disabled={status === 'FINISHED'}
                                className="w-full max-w-xs py-2 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50">Завершить
                            интервью
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InterviewPage;