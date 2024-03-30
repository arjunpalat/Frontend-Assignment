import ChartComponent from "../Chart/ChartComponent";
import { useEffect, useState } from "react";
import { MimicMetrics } from "../../services/api-mimic";
import { useAppState } from "../../AppContext";

const Metrics = () => {
  const [chartData, setChartData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { selectorOption } = useAppState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const data = await MimicMetrics.fetchMetrics({
          startTs: Date.now() - selectorOption.value,
          endTs: Date.now(),
        });
        console.log(data);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, [selectorOption]);

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
            chartData.map((data) => <ChartComponent chartData={data} />)}
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
