// LoadingPreviousLogs.jsx
import spinner from "../../assets/spinner.svg";

const LoadingPreviousLogs = () => (
  <div className="bg-logs_loading rounded-t-lg py-1 text-center absolute top-0 z-10 w-full">
    <div className="inline-flex gap-2">
      <img src={spinner} alt="Loading" />
      <div className="text-xs font-medium text-gray8">
        Loading previous logs
      </div>
    </div>
  </div>
);

export default LoadingPreviousLogs;
