import logo from "../assets/tf_logo.svg";
import list from "../assets/list.svg";
import metrics from "../assets/metrics.svg";
import chevron from "../assets/chevron.svg";

const Navbar = () => {
  return (
    <nav className="h-20 bg-white">
      <div className="flex px-4 h-full py-4 justify-between items-center">
        <div className="flex gap-10">
          <img src={logo} alt="Logo" className="h-8" />
          <div className="flex gap-5">
            <div className="flex flex-col justfy-between gap-2.5">
              <div className="flex gap-1.5 items-center py-0 px-1">
                <img className="h-3.5" src={metrics} />
                <span className="text-base text-gray-600">Metrics</span>
              </div>
              <div className="h-0.5 bg-gray-300 w-full"></div>
            </div>
            <div className="flex flex-col justfy-between gap-2.5">
              <div className="flex gap-1.5 items-center py-0 px-1">
                <img className="h-3" src={list} />
                <span className="text-base text-gray-600">Logs</span>
              </div>
              <div className="h-0.5 bg-gray-300 w-full"></div>
            </div>
          </div>
        </div>
        <div>
          <button className="rounded border border-gray5 px-2 py-1 flex gap-1.5 items-center">
            <div className="text-xs text-gray12">Last 5 minutes</div>
            <img src={chevron} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
