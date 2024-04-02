import CalendarComponent from "./CalendarComponent.jsx";
import { calendar } from "./index.js";
import { useState } from "react";
import { useUrlParams } from "../../hooks/useUrlParams.js";

const RangePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fromTimestamp, toTimestamp, setSearchParams } = useUrlParams();

  return (
    <div className="relative">
      <button
        className="rounded border border-gray5 px-2 py-1 text-xs"
        onClick={() => setIsOpen(!isOpen)}
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
