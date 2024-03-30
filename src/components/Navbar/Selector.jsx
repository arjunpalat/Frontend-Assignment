import { useState } from "react";
import { useAppDispatch, useAppState } from "../../AppContext.jsx";
import Dropdown from "./Dropdown";
import { chevron } from "./index.js";

const Selector = () => {
  const dispatch = useAppDispatch();
  const { selectorOption } = useAppState();
  const [isOpen, setIsOpen] = useState(false);

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
            {selectorOption.label}
          </div>
          <img src={chevron} />
        </div>
      </button>
      {isOpen && <Dropdown handleToggle={toggleSelector} />}
    </div>
  );
};

export default Selector;
