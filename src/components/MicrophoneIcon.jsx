const MicrophoneIcon = ({ isListening }) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
    backgroundColor: isListening ? '#EF4444' : '#3B82F6', // red-500 : blue-600
    animation: isListening ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
  };

  const emojiStyle = {
    fontSize: '40px',
  };
  
  return (
    <div>
      <style>
        {`
          @keyframes pulse {
            50% {
              opacity: .5;
            }
          }
        `}
      </style>
      <div style={style}>
        <span style={emojiStyle} role="img" aria-label="Микрофон">
          🎙️
        </span>
      </div>
    </div>
  );
};

export default MicrophoneIcon;