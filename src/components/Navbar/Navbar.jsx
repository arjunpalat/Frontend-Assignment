import { metrics, metrics_active, logs, logs_active } from "./index.js";
import LinkButton from "./LinkButtons.jsx";
import Selector from "./Selector.jsx";
import RangePicker from "./RangePicker.jsx";
const Navbar = () => {
  return (
    <nav className="h-20 bg-white">
      <div className="flex px-4 h-full py-4 justify-between items-center">
        <div className="flex gap-10">
          <div className="h-8 font-bold text-teal-500 text-xl">⚙️ LOGMET</div>
          <div className="flex gap-5">
            <LinkButton
              goTo="/metrics"
              label="Metrics"
              icon={{ normal: metrics, active: metrics_active }}
              height="h-3.5"
            />
            <LinkButton
              goTo="/logs"
              label="Logs"
              icon={{ normal: logs, active: logs_active }}
              height="h-3"
            />
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <RangePicker />
          <Selector />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
