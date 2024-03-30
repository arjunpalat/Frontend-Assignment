import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const LinkButton = ({ goTo, height, label, icon }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col justfy-between gap-2.5">
      <Link
        to={goTo}
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
