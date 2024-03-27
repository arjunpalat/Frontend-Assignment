import { useEffect, useRef } from "react";
import Chart from "chart.js";

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            displayFormats: {
              day: "MMM D",
            },
          },
        },
        y: {
          min: 0,
          max: 2000,
        },
      },
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
        selection: {
          mode: "x",
        },
      },
    };

    const chartData = {
      labels: [
        "2022-01-01",
        "2022-01-02",
        "2022-01-03",
        "2022-01-04",
        "2022-01-05",
      ],
      datasets: [
        {
          label: "Case 1",
          data: [500, 1000, 1500, 1200, 1800],
          borderColor: "red",
          fill: false,
        },
        {
          label: "Case 2",
          data: [800, 1200, 1000, 1400, 1600],
          borderColor: "blue",
          fill: false,
        },
        {
          label: "Case 3",
          data: [600, 900, 1100, 1300, 1700],
          borderColor: "green",
          fill: false,
        },
      ],
    };

    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;
