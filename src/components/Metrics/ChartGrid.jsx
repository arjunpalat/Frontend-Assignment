// ChartGrid.jsx
import ChartComponent from "../Chart/ChartComponent";

const ChartGrid = ({ chartData, chartTimeStamp }) => (
  <div className="mx-5 my-4 grid grid-cols-2 grid-rows-2 gap-5">
    {chartData.map((data) => (
      <ChartComponent
        chartData={data}
        key={data.name}
        chartTimeStamps={chartTimeStamp}
      />
    ))}
  </div>
);

export default ChartGrid;
