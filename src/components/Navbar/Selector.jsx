import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { chevron } from "./index.js";
import { validateQuery } from "../../utils/converters.js";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Selector = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectorOption, setSelectorOption] = useState(null);

  useEffect(() => {
    const q = searchParams.get("query");
    const option = validateQuery(q);
    if (option) {
      setSelectorOption(option);
    } else {
      setSelectorOption({
        label: "Last 5 minutes",
        value: 5 * 60 * 1000,
        query: "last-5-minutes",
      });
      (pathname === "/metrics" || pathname === "/logs") &&
        setSearchParams({ query: "last-5-minutes" });
    }
  }, [searchParams, pathname]);

  const toggleSelector = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="rounded border border-gray5 px-2 py-1"
        onClick={toggleSelector}
        disabled={pathname !== "/logs" && pathname !== "/metrics"}
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
