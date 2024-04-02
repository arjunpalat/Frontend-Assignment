import { dropdownOptions } from ".";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ handleToggle, selectorOption }) => {
  const navigate = useNavigate();
  const handleSelectorOption = (option) => {
    if (option.query !== selectorOption.query) {
      navigate(`?query=${option.query}`);
    }
    handleToggle();
  };

  return (
    <div className="absolute right-0 top-7 bg-white border-[0.3px] border-gray5 rounded-md w-36 px-2 py-3 z-20">
      <div className="flex flex-col gap-2.5">
        {dropdownOptions.map((option) => (
          <div
            key={option.value}
            className="text-sm flex justify-between font-medium pb-2 border-b hover:cursor-pointer"
            onClick={() => handleSelectorOption(option)}
          >
            <div>{option.label}</div>
            {selectorOption.value === option.value && (
              <div className="text-checkmark">&#10003;</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
