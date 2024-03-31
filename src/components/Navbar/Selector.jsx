import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import { chevron, validateQuery } from "./index.js";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { set } from "date-fns";

const Selector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectorOption, setSelectorOption] = useState(null);

  useEffect(() => {
    const q = searchParams.get("query");
    const option = validateQuery(q);
    if (q === "range") {
      setSelectorOption({ label: "Custom Range", value: 0, query: "range" });
    } else if (option) {
      setSelectorOption(option);
    } else {
      setSelectorOption({
        label: "Last 5 minutes",
        value: 5 * 60 * 1000,
        query: "last-5-minutes",
      });
      setSearchParams({ query: "last-5-minutes" });
    }
  }, [searchParams]);

  const toggleSelector = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="rounded border border-gray5 px-2 py-1"
        onClick={toggleSelector}
      >
        <div className="flex gap-1.5 items-center">
          <div className="text-xs font-medium text-gray12">
            {selectorOption && selectorOption.label}
          </div>
          <img src={chevron} />
        </div>
      </button>
      {isOpen && (
        <Dropdown
          handleToggle={toggleSelector}
          selectorOption={selectorOption}
        />
      )}
    </div>
  );
};

export default Selector;
