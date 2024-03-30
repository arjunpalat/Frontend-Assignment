import { getChartConfig, getLabelColor } from "./index.js";
import { useAppState } from "../../AppContext";
import {
  Chart as ChartJS,
  Filler,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartComponent = ({ chartData }) => {
  const { selectorOption } = useAppState();

  console.log("Reload!");

  const config = getChartConfig(chartData, selectorOption);

  return (
    <div>
      {chartData && (
        <div className="flex flex-col border border-gray4 rounded-lg px-4 py-4 gap-5">
          <div className="text-start text-gray12 text-sm font-semibold">
            {chartData.name}
          </div>
          <Line className="max-h-56" options={config.options} data={config.data} />
          <div className="flex text-sm font-semibold">
            {chartData.graphLines.map(({ name }) => (
              <div className="flex py-0.5 pr-6 pl-0.5 items-center gap-1.5">
                <div
                  className={`w-2.5 h-2.5 ${getLabelColor(name)} rounded-sm`}
                ></div>
                <div className="text-gray12">{name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
