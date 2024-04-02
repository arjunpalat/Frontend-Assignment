import { useState } from "react";
import { DatePicker, InputGroup } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import { generateRangeQueryUrlParams } from "../../utils/converters";

const CalendarComponent = ({
  fromTimestamp,
  toTimestamp,
  setSearchParams,
  setIsOpen,
}) => {
  const [fromDate, setFromDate] = useState(fromTimestamp);
  const [toDate, setToDate] = useState(toTimestamp);

  const handleRange = () => {
    setSearchParams(generateRangeQueryUrlParams(fromDate, toDate));
    setIsOpen(false);
  };

  const disableDates = (date) => {
    if (fromDate) {
      return date.getTime() < fromTimestamp;
    }
    return false;
  };

  return (
    <div className="absolute flex gap-2 items-center top-0 right-20">
      <InputGroup style={{ width: 428 }}>
        <DatePicker
          format="dd-MM-yyyy HH:mm"
          block
          placeholder="From"
          appearance="subtle"
          style={{ width: 230 }}
          onChange={(e) => {
            setFromDate(e.getTime());
          }}
          value={new Date(fromDate)}
        />
        <InputGroup.Addon>to</InputGroup.Addon>
        <DatePicker
          format="dd-MM-yyyy HH:mm"
          block
          appearance="subtle"
          placeholder="To"
          style={{ width: 230 }}
          onChange={(e) => {
            setToDate(e.getTime());
          }}
          shouldDisableDate={disableDates}
          value={new Date(toDate)}
        />
      </InputGroup>
      <button
        onClick={handleRange}
        className="bg-teal-600 text-white rounded-lg px-2 py-1 mt-2"
      >
        &rarr;
      </button>
    </div>
  );
};

export default CalendarComponent;
