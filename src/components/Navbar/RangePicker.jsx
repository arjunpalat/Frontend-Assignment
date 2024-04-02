import CalendarComponent from "./CalendarComponent.jsx";
import { calendar } from "./index.js";
import { useState } from "react";
import { useUrlParams } from "../../hooks/useUrlParams.js";
import { useLocation } from "react-router-dom";

const RangePicker = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { fromTimestamp, toTimestamp, setSearchParams } = useUrlParams();

  return (
    <div className="relative">
      <button
        className="rounded border border-gray5 px-2 py-1 text-xs"
        onClick={() => setIsOpen(!isOpen)}
        disabled={pathname !== "/metrics" && pathname !== "/logs"}
      >
        <img src={calendar} alt="🗓️" className="h-5" />
      </button>
      {isOpen && (
        <CalendarComponent
          key={fromTimestamp}
          fromTimestamp={fromTimestamp}
          toTimestamp={toTimestamp}
          setSearchParams={setSearchParams}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
export default RangePicker;
