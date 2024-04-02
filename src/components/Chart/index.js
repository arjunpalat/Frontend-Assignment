const isFill = (name) => {
  return name === "Disk IOPS";
};

const getChartBackgroundColor = (name) => {
  const bgColor =
    name === "Limits"
      ? "rgba(0, 128, 0, 0.1)"
      : name === "Requested" || name === "Read"
      ? "rgba(0, 0, 255, 0.1)"
      : "rgba(255, 0, 0, 0.1)";
  return bgColor;
};

const getChartBorderColor = (name) => {
  const borderColor =
    name === "Limits"
      ? "#059669"
      : name === "Requested" || name === "Read"
      ? "#2563EB"
      : "#DC2626";
  return borderColor;
};

export const getLabelColor = (name) => {
  const labelColor =
    name === "Limits"
      ? "bg-green-600"
      : name === "Requested" || name === "Read"
      ? "bg-blue-600"
      : "bg-red-600";
  return labelColor;
};

export const getChartConfig = (chartData, chartTimeStamps) => {
  const lines = chartData.graphLines;
  const data = {
    labels: [chartTimeStamps.from, chartTimeStamps.to],
    datasets: lines.map(({ name, values }) => ({
      data: values.map((value) => ({
        x: value.timestamp,
        y: value.value,
      })),
      borderColor: getChartBorderColor(name),
      backgroundColor: getChartBackgroundColor(name),
      tension: 0.1,
      borderWidth: 2,
      fill: isFill(chartData.name),
      pointRadius: 0,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
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
          stepSize: 1 / 6,
        },
      },
      y: {
        position: "right",
        ticks: {
          maxTicksLimit: 5,
          stepSize: 30,
        },
      },
    },
  };
  return { data, options };
};
