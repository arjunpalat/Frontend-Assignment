import ChartComponent from "../Chart/ChartComponent";
import { useEffect, useState, useRef } from "react";
import { MimicMetrics } from "../../services/api-mimic";
import { useAppState } from "../../AppContext";
import { useSearchParams } from "react-router-dom";
import { ISOtoTimestamp } from "../../services/fetch-api-mimic";
import { lastLogsTsRange } from "../Logs";

const Metrics = () => {
  const [chartData, setChartData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const to = searchParams.get("to");
  const from = searchParams.get("from");
  const latestTimeRef = useRef(Date.now());
  const [chartTimeStamp, setChartTimeStamp] = useState({});

  const decodedTo = decodeURIComponent(to);
  const decodedFrom = decodeURIComponent(from);
  useEffect(() => {
    console.log("effect")
    const fetchData = async () => {
      try {
        console.log("Fetching...")
        latestTimeRef.current = Date.now();
        setIsFetching(true);
        const startTs = query === "range" ? ISOtoTimestamp(decodedFrom) : latestTimeRef.current - lastLogsTsRange[query];
        const endTs = query === "range" ? ISOtoTimestamp(decodedTo) : latestTimeRef.current;
        const data = await MimicMetrics.fetchMetrics({
          startTs,
          endTs});
        console.log(data);
        setChartData(data);
        setChartTimeStamp({ to: endTs, from: startTs});
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };
    if (query) fetchData();
  }, [searchParams]);

  return (
    <div className="mx-5 mt-5 bg-white flex flex-col">
      <div className="py-4 px-5 border rounded-t-lg border-gray4">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">Metrics</div>
          <div className="text-xs">09/08/23 10:10 &rarr; 09/08/23 10:15</div>
        </div>
      </div>
      <div className="bg-metrics_inner border border-t-0 border-gray4 rounded-b-lg">
        <div className="mx-5 my-4 grid grid-cols-2 grid-rows-2 gap-5">
          {chartData &&
            !isFetching &&
            chartData.map((data) => <ChartComponent chartData={data} chartTimeStamps={chartTimeStamp} />)}
          {(!chartData || isFetching) && (
            <>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-64 bg-blue-100 flex items-center justify-center"
                >
                  <div>⏳</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
