import spinner from "../assets/spinner.svg";
const Logs = () => {
  return (
    <div className="pb-9 px-5 pt-3.5 border border-gray4 flex flex-col gap-3.5">
      <div className="text-xs text-right font-medium">
        Showing logs for 09/08/23 10:10 &rarr; 09/08/23 10:15
      </div>
      <div className="flex flex-col">
        <div className="bg-logs_loading rounded-t-lg py-1 text-center">
          <div className="inline-flex gap-2">
            <img src={spinner}></img>
            <div className="text-xs font-medium text-gray8">
              Loading previous 100 logs
            </div>
          </div>
        </div>
        <div className="bg-logs_inner rounded-b-lg pb-10 pt-3.5 pr-3.5 pl-3 gap-2.5 flex flex-col max-h-[730px]">
          <div className="flex gap-2">
            <div className="bg-blue-400 w-0.5"></div>
            <div className="text-xs text-gray10">Feb 22 18:58:35.167</div>
            <div className="text-xs text-gray10">[info]</div>
            <div className="text-xs text-gray8">
              Server is running on port 3000
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-blue-400 w-0.5"></div>
            <div className="text-xs text-gray10">Feb 22 18:58:35.167</div>
            <div className="text-xs text-red-400">[error]</div>
            <div className="text-xs text-red-400">
              Failed to GET /api/v1/users
            </div>
          </div>
          <div className="flex gap-2">
            <div className="bg-teal-400 w-0.5"></div>
            <div className="text-xs text-gray10">Feb 22 18:58:35.167</div>
            <div className="text-xs text-teal-400">[success]</div>
            <div className="text-xs text-teal-400">200 OK GET /api/v1/logs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
