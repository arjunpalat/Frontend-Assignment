import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUrlParams } from "../../hooks/useUrlParams";
import { validateQuery } from "../../utils/converters";

const LinkButton = ({ goTo, height, label, icon }) => {
  const { query } = useUrlParams();
  const location = useLocation();
  const pathname = location.pathname;
  const allParams = location.search
  const validQuery = validateQuery(query);
  return (
    <div className="flex flex-col justfy-between gap-2.5">
      <Link
        to={validQuery ? `${goTo}${allParams}` : goTo}
        className="flex gap-1.5 items-center py-0 px-1 hover:scale-105"
      >
        <img
          className={height}
          src={pathname === goTo ? icon.active : icon.normal}
        />
        <span
          className={`text-base ${
            pathname !== goTo ? "text-gray-600" : "text-black"
          }`}
        >
          {label}
        </span>
      </Link>
      {pathname === goTo && (
        <div className={`h-0.5 bg-active_tab w-full`}></div>
      )}
    </div>
  );
};

export default LinkButton;
