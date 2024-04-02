import { useEffect, useState } from "react";
import { MimicMetrics } from "../../services/api-mimic";
import MetricsHeader from "./MetricsHeader";
import LoadingIndicator from "./LoadingIndicator";
import ChartGrid from "./ChartGrid";
import { useUrlParams } from "../../hooks/useUrlParams";
import { validateQuery } from "../../utils/converters";

const Metrics = () => {
  const [chartData, setChartData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { fromTimestamp, toTimestamp, query } = useUrlParams();
  const [chartTimeStamp, setChartTimeStamp] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const data = await MimicMetrics.fetchMetrics({
          startTs: fromTimestamp,
          endTs: toTimestamp,
        });
        setChartData(data);
        setChartTimeStamp({ to: toTimestamp, from: fromTimestamp });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };
    if (validateQuery(query)) fetchData();
  }, [toTimestamp, fromTimestamp]);

  return (
    <div className="mx-5 mt-5 bg-white flex flex-col">
      <MetricsHeader timeStamps={{ start: fromTimestamp, end: toTimestamp }} />
      <div className="bg-metrics_inner border border-t-0 border-gray4 rounded-b-lg">
        {chartData && !isFetching ? (
          <ChartGrid chartData={chartData} chartTimeStamp={chartTimeStamp} />
        ) : (
          <LoadingIndicator />
        )}
      </div>
    </div>
  );
};

export default Metrics;
