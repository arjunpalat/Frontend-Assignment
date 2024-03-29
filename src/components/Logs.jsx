import { useState, useEffect, useRef } from "react";
import spinner from "../assets/spinner.svg";
import { MimicLogs } from "../services/api-mimic";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [liveLogCount, setLiveLogCount] = useState(0);
  const [fetchingPreviousLogs, setFetchingPreviousLogs] = useState(false);
  const [hasMorePreviousLogs, setHasMorePreviousLogs] = useState(true);
  const logsContainerRef = useRef(null);
  const autoScrollRef = useRef(true);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  useEffect(() => {
    const unsubscribeLiveLogs = MimicLogs.subscribeToLiveLogs((newLog) => {
      setLogs((prevLogs) => [...prevLogs, newLog]);
      if (autoScrollRef.current) {
        scrollToBottom();
        console.log("Auto Scrolling to bottom...");
      } else {
        setLiveLogCount((count) => count + 1);
      }
    });

    return () => unsubscribeLiveLogs();
  }, []);

  useEffect(() => {
    // Fetch initial logs when component mounts
    fetchLogs();
  }, []);

  useEffect(() => {
    if (fetchingPreviousLogs === false) {
      console.log(
        "Updated from useEffect Scroll Height: ",
        logsContainerRef.current.scrollHeight
      );
      logsContainerRef.current.scrollTop +=
        logsContainerRef.current.scrollHeight - prevScrollHeight;
    }
  }, [fetchingPreviousLogs]);

  useEffect(() => {
    // Scroll to bottom when logs change
    if (autoScrollRef.current) {
      console.log("Auto Scrolling to bottom...");
      scrollToBottom();
      setLiveLogCount(0);
    }
    setPrevScrollHeight(logsContainerRef.current.scrollHeight);
  }, [logs]);

  const fetchLogs = async () => {
    // Fetch initial logs
    const fetchedLogs = await MimicLogs.fetchPreviousLogs({
      startTs: Date.now(),
      endTs: Date.now(),
      limit: 100,
    });
    setLogs(fetchedLogs);
  };

  const handleScroll = () => {
    const atBottom =
      logsContainerRef.current.scrollTop + 10 >=
      logsContainerRef.current.scrollHeight -
        logsContainerRef.current.clientHeight;

    autoScrollRef.current = atBottom;
    if (
      logsContainerRef.current.scrollTop === 0 &&
      !fetchingPreviousLogs &&
      hasMorePreviousLogs
    ) {
      // Fetch previous logs when scrolling to the top
      setFetchingPreviousLogs(true);
      fetchPreviousLogs();
    }
  };

  const fetchPreviousLogs = async () => {
    // Fetch previous logs
    const previousLogs = await MimicLogs.fetchPreviousLogs({
      startTs: logs[0].timestamp,
      endTs: logs[0].timestamp,
      limit: 100,
    });

    // Add previous logs to the beginning of the logs array
    setLogs((prevLogs) => {
      return [...previousLogs, ...prevLogs];
    });

    setFetchingPreviousLogs(false);

    // Check if there are more logs to fetch
    setHasMorePreviousLogs(previousLogs.length === 100);
  };

  const scrollToBottom = () => {
    logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  };

  return (
    <div className="pb-9 px-5 pt-3.5 border border-gray4 flex flex-col gap-3.5">
      <div className="text-xs text-right font-medium">
        Showing logs for 09/08/23 10:10 &rarr; 09/08/23 10:15
      </div>
      <div className="flex flex-col relative">
        {fetchingPreviousLogs && (
          <div className="bg-logs_loading rounded-t-lg py-1 text-center">
            <div className="inline-flex gap-2">
              <img src={spinner} alt="Loading" />
              <div className="text-xs font-medium text-gray8">
                Loading previous logs
              </div>
            </div>
          </div>
        )}
        <div
          className="bg-logs_inner rounded-b-lg pb-10 pt-3.5 pr-3.5 pl-3 gap-2.5 flex flex-col max-h-[730px] overflow-y-auto relative"
          ref={logsContainerRef}
          onScroll={handleScroll}
        >
          {logs.map((log, index) => (
            <div className="flex gap-2" key={index}>
              <div className={`bg-blue-400 w-0.5 flex-shrink-0`}></div>
              <div className="text-xs text-gray10">
                {new Date(log.timestamp).toLocaleTimeString()}
              </div>
              <div className={`text-xs text-gray10`}>[info]</div>
              <div
                className={`text-xs text-gray6 overflow-hidden whitespace-nowrap overflow-ellipsis`}
              >
                {log.message}
              </div>
            </div>
          ))}
        </div>
        {liveLogCount > 0 && (
          <div
            className="bg-indigo-700 text-xs text-gray3 h-7 px-5 text-center py-1 cursor-pointer rounded absolute bottom-5 right-5"
            onClick={() => {
              autoScrollRef.current = true;
              setLiveLogCount(0);
              scrollToBottom();
            }}
          >
            {liveLogCount} new log{liveLogCount > 1 ? "s" : ""} &darr;
          </div>
        )}
      </div>
    </div>
  );
};

export default Logs;
