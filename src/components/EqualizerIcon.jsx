const EqualizerIcon = ({ isListening }) => {
  const Bar = ({ height, delay }) => (
    <div
      style={{ animationDelay: delay }}
      className={`w-2 rounded-full bg-blue-500 ${height} ${isListening ? 'animate-equalize' : ''}`}
    ></div>
  );

  return (
    <div className="flex items-end justify-center w-24 h-12 gap-1.5">
      <Bar height="h-4" delay="0s" />
      <Bar height="h-8" delay="0.2s" />
      <Bar height="h-6" delay="0.4s" />
      <Bar height="h-10" delay="0.1s" />
    </div>
  );
};

export default EqualizerIcon;