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
      ? "green"
      : name === "Requested" || name === "Read"
      ? "blue"
      : "red";
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

export const getChartConfig = (chartData, selectorOption) => {
  const lines = chartData.graphLines;
  const data = {
    labels: [Date.now() - selectorOption.value, Date.now()],
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
  return { data, options };
};
