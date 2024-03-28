import { useState, useEffect } from "react";

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
import { MimicMetrics } from "../services/api-mimic";

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

const ChartComponent = ({ ver, isFill = false }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MimicMetrics.fetchMetrics({
          startTs: Date.now() - 3600 * 1000, // Example start timestamp (1 hour ago)
          endTs: Date.now(), // Example end timestamp (current time)
        });
        console.log(data); // Example output: 'Data fetched successfully!
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: [Date.now() - 3600 * 1000, Date.now()],
    datasets:
      chartData &&
      chartData[ver].graphLines.map(({ name, values }) => ({
        data: values.map((value) => ({
          x: value.timestamp,
          y: value.value,
        })),
        borderColor:
          name === "Limits"
            ? "green"
            : name === "Requested" || name === "Read"
            ? "blue"
            : "red",

        backgroundColor:
          name === "Limits"
            ? "rgba(0, 128, 0, 0.1)"
            : name === "Requested" || name === "Read"
            ? "rgba(0, 0, 255, 0.1)"
            : "rgba(255, 0, 0, 0.1)",
        tension: 0.1,
        borderWidth: 2,
        fill: isFill,
        pointRadius: 0,
      })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "HH:mm",
          },
        },
        ticks: {
          stepSize: 1 / 12,
        },
      },
      y: {
        position: "right",
        ticks: {
          maxTicksLimit: 6,
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div>
      {chartData && (
        <div className="flex flex-col border border-gray4 rounded-lg px-4 py-4 gap-5">
          <div className="text-start text-gray12 text-sm font-semibold">
            Graph
          </div>
          <Line className="h-56" options={options} data={data} />
          <div className="flex text-sm font-semibold">
            <div className="flex py-0.5 pr-6 pl-0.5 items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-red-600 rounded-sm"></div>
              <div className="text-gray12">Used</div>
            </div>
            <div className="flex py-0.5 pr-6 pl-0.5 items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></div>
              <div className="text-gray12">Requested</div>
            </div>
            <div className="flex py-0.5 pr-6 pl-0.5 items-center gap-1.5">
              <div className="w-2.5 h-2.5 bg-green-600 rounded-sm"></div>
              <div className="text-gray12">Limits</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
