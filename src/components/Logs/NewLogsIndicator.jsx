// NewLogsIndicator.jsx
const NewLogsIndicator = ({ liveLogCount, scrollToBottom }) => (
  <div
    className="bg-indigo-700 text-xs text-gray3 h-7 px-5 text-center py-1 cursor-pointer rounded absolute bottom-5 right-5"
    onClick={() => {
      autoScrollRef.current = true;
      setLiveLogCount(0);
      scrollToBottom();
    }}
  >
    {liveLogCount} new log{liveLogCount > 1 ? "s" : ""} &darr;
  </div>
);

export default NewLogsIndicator;
