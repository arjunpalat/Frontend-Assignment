import ChartComponent from "./ChartComponent";

const Metrics = () => {
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
          <ChartComponent ver={0} />
          <ChartComponent ver={1} />
          <ChartComponent ver={2} />
          <ChartComponent ver={3} isFill={true} />
        </div>
      </div>
    </div>
  );
};

export default Metrics;
