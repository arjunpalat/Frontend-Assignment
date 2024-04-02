import { getChartConfig, getLabelColor } from "./index.js";
import { useState } from "react";
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
import { useRef } from "react";
import { ISOtoTimestamp } from "../../services/fetch-api-mimic.js";
import { useNavigate } from "react-router-dom";

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

const ChartComponent = ({ chartData, chartTimeStamps }) => {
  console.log("Reload!");

  function toLocaleISOString(date) {
    var offsetMs = date.getTimezoneOffset() * 60 * 1000;
    var localDate = new Date(date.getTime() - offsetMs);
    var iso = localDate.toISOString();
    return iso.slice(0, 19);
  }

  const fullData = chartData; // The full line data
  const highlightedData = useRef([]);
  const selectedPoints = useRef([]);
  const [showLogs, setShowLogs] = useState(false);
  const navigate = useNavigate();

  const handleViewLogs = () => {
    // Sort the selected points by timestamp
    const sortedPoints = selectedPoints.current.sort((a, b) => b.x - a.x);

    // Get the from and to timestamps
    const fromTimestamp = sortedPoints[0].y.x;
    console.log(fromTimestamp);
    const toTimestamp = sortedPoints[1].y.x;

    // Convert timestamps to ISO 8601 format and remove milliseconds
    const from = toLocaleISOString(new Date(fromTimestamp)).split(".")[0];
    const to = toLocaleISOString(new Date(toTimestamp)).split(".")[0];

    console.log(from, to);

    // Encode the timestamps
    const encodedFrom = encodeURIComponent(from);
    console.log(encodedFrom);
    const encodedTo = encodeURIComponent(to);

    // Construct the URL
    const url = `/logs?query=range&from=${encodedFrom}&to=${encodedTo}`;
    navigate(url);
  };

  const config = getChartConfig(fullData, chartTimeStamps);

  // Dataset for the selected points
  config.data.datasets.push({
    label: "Selected Points",
    data: selectedPoints.current.map((point) => point.y),
    fill: false,
    borderColor: "#F97316",

    borderWidth: 4,
    pointRadius: 3,
    showLine: false,
  });

  // Dataset for the highlighted section
  config.data.datasets.push({
    label: "Highlighted Section",
    data: highlightedData.current.map((point) => point.y),
    fill: true,
    borderColor: "transparent", // Hide the border color
    backgroundColor: "rgba(0, 0, 255, 0.1)", // Set the fill color
    pointRadius: 0, // Hide the points
  });

  config.options.onClick = function (event, elements) {
    // If a point was clicked
    if (elements.length > 0) {
      const firstPoint = elements[0];
      console.log(elements);
      const label = this.data.labels[firstPoint.index];
      const value =
        this.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
      const color = this.data.datasets[firstPoint.datasetIndex].backgroundColor;

      // If the selectedPoints array is empty or the clicked point is on the same line as the last clicked point
      // If selectedPoints is empty
      if (selectedPoints.current.length === 0) {
        // Simply add the selected point to it
        selectedPoints.current.push({
          x: label,
          y: value,
          datasetIndex: firstPoint.datasetIndex,
          index: firstPoint.index,
        });
      }
      // If selectedPoints has 1 element
      else if (selectedPoints.current.length === 1) {
        const existingPoint = selectedPoints.current[0];

        // Check whether it's dataindex is same as the current clicked element's (ensuring they are from the same line)
        // and it's not the same already added point too
        if (
          existingPoint.datasetIndex === firstPoint.datasetIndex &&
          existingPoint.index !== firstPoint.index
        ) {
          // If yes, add to it
          console.log("Added to selected points");
          selectedPoints.current.push({
            x: label,
            y: value,
            datasetIndex: firstPoint.datasetIndex,
            index: firstPoint.index,
          });
        } else {
          // Otherwise replace the selectedPoints array with the newly clicked point only
          selectedPoints.current = [
            {
              x: label,
              y: value,
              datasetIndex: firstPoint.datasetIndex,
              index: firstPoint.index,
            },
          ];
        }
      }
      // If selectedPoints has 2 elements
      else if (selectedPoints.current.length === 2) {
        // Just replace the selectedPoints with only the newly clicked
        selectedPoints.current = [
          {
            x: label,
            y: value,
            datasetIndex: firstPoint.datasetIndex,
            index: firstPoint.index,
          },
        ];
        setShowLogs(false);
        // Also replace the highlightedData array to empty
        highlightedData.current = [];
      }

      console.log("Selected points are: ", selectedPoints.current);

      // If there are two points in the selectedPoints array
      if (selectedPoints.current.length === 2) {
        // Add all the points between the two clicked points to the highlightedData array
        const index1 = selectedPoints.current[0].index;
        const index2 = selectedPoints.current[1].index;
        const startIndex = Math.min(index1, index2);
        const endIndex = Math.max(index1, index2);
        const datasetIndex = selectedPoints.current[0].datasetIndex;
        console.log(index1, index2);
        for (let i = startIndex; i <= endIndex; i++) {
          console.log(i);
          highlightedData.current.push({
            x: null,
            y: this.data.datasets[datasetIndex].data[i],
          });
          console.log(highlightedData.current);
        }
        setShowLogs(true);
      }
      // Update the datasets in the Chart.js configuration
      const selectedDataset = this.data.datasets.find(
        (dataset) => dataset.label === "Selected Points"
      );
      selectedDataset.data = selectedPoints.current.map((point) => point.y);
      selectedDataset.backgroundColor = color; // Update the color of the selected points to match the color of the selected line

      const highlightedDataset = this.data.datasets.find(
        (dataset) => dataset.label === "Highlighted Section"
      );
      highlightedDataset.data = highlightedData.current.map((point) => point.y);
      highlightedDataset.backgroundColor = color; // Update the fill color of the highlighted section to match the color of the selected line

      this.update(); // Redraw the chart with the new data
    }
  };

  return (
    <div>
      {chartData && (
        <div className="flex flex-col border border-gray4 rounded-lg px-4 py-4 gap-5">
          <div className="flex justify-between">
            <div className="text-start text-gray12 text-sm font-semibold">
              {chartData.name}
            </div>
            {showLogs && (
              <div>
                <button
                  onClick={handleViewLogs}
                  className="text-white text-xs px-1 py-1 bg-black rounded-lg "
                >
                  View Logs
                </button>
              </div>
            )}
          </div>
          <Line
            className="max-h-56"
            options={config.options}
            data={config.data}
          />
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
