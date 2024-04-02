// LogItem.jsx
import { formatLogTimestamp } from "../../utils/converters";
const LogItem = ({ log }) => (
  <div className="flex gap-2">
    <div className={`bg-blue-400 w-0.5 flex-shrink-0`}></div>
    {formatLogTimestamp(log.timestamp).map((item, index) => (
      <div className="text-xs text-gray10" key={`logTime${index}`}>
        {item}
      </div>
    ))}
    <div className={`text-xs text-gray10`}>[info]</div>
    <div
      className={`text-xs text-gray6 overflow-hidden whitespace-nowrap overflow-ellipsis`}
    >
      {log.message}
    </div>
  </div>
);

export default LogItem;
