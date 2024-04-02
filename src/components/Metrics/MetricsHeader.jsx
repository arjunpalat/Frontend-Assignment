import { formatTimestamp } from "../../utils/converters";

const MetricsHeader = ({ timeStamps }) => {
  const from = formatTimestamp(timeStamps.start);
  const to = formatTimestamp(timeStamps.end);
  return (
    <div className="py-4 px-5 border rounded-t-lg border-gray4">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold">Metrics</div>
        <div className="text-xs">
          {from} &rarr; {to}
        </div>
      </div>
    </div>
  );
};
export default MetricsHeader;
