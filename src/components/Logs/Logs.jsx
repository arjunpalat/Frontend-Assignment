import { useState, useEffect, useRef } from "react";
import { MimicLogs } from "../../services/api-mimic";
import { fetcherLogs } from "../../services/fetch-api-mimic";
import LogItem from "./LogItem.jsx";
import LoadingPreviousLogs from "./LoadingPreviousLogs.jsx";
import NewLogsIndicator from "./NewLogsIndicator.jsx";
import { formatTimestamp } from "../../utils/converters";
import { useUrlParams } from "../../hooks/useUrlParams.js";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [liveLogCount, setLiveLogCount] = useState(0);
  const [fetchingPreviousLogs, setFetchingPreviousLogs] = useState(false);
  const logsContainerRef = useRef(null);
  const autoScrollRef = useRef(false);
  const unsubcribeRef = useRef(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [pagination, setPagination] = useState(1);
  const { fromTimestamp, toTimestamp, latestTimeRef, query } = useUrlParams();
  const hasMorePreviousLogs = pagination !== 11;

  const enableSubscribtion = () => {
    const callbackFunction = (newLog) => {
      setLogs((prevLogs) => [...prevLogs, newLog]);
    };
    const subscribe = MimicLogs.subscribeToLiveLogs;
    unsubcribeRef.current = subscribe(callbackFunction);
  };

  useEffect(() => {
    if (query) {
      setLogs([]);
      fetchAndUpdateMountLogs();
    }
    return () => {
      if (unsubcribeRef.current) {
        unsubcribeRef.current();
      }
      setLiveLogCount(0);
    };
  }, [fromTimestamp, toTimestamp, query]);

  useEffect(() => {
    if (fetchingPreviousLogs === false) {
      logsContainerRef.current.scrollTop +=
        logsContainerRef.current.scrollHeight - prevScrollHeight;
    }
  }, [fetchingPreviousLogs]);

  useEffect(() => {
    if (autoScrollRef.current) {
      scrollToBottom();
      setLiveLogCount(0);
    } else {
      setLiveLogCount((prev) => prev + 1);
    }
    if (logs.length === 40) {
      logsContainerRef.current.scrollTop += 1;
    }
    setPrevScrollHeight(logsContainerRef.current.scrollHeight);
  }, [logs]);

  const handleScroll = () => {
    const atBottom =
      logsContainerRef.current.scrollTop + 10 >=
        logsContainerRef.current.scrollHeight -
          logsContainerRef.current.clientHeight && logs.length > 0;
    autoScrollRef.current = atBottom;
    if (
      !atBottom &&
      logsContainerRef.current.scrollTop === 0 &&
      !fetchingPreviousLogs &&
      hasMorePreviousLogs &&
      logs.length > 0
    ) {
      fetchAndUpdatePreviousLogs();
    }
  };

  const fetchAndUpdatePreviousLogs = async () => {
    try {
      setFetchingPreviousLogs(true);
      const previousLogs = await fetcherLogs(
        logs,
        toTimestamp,
        fromTimestamp,
        latestTimeRef.current
      );
      if (previousLogs.length !== 0) {
        setLogs((prevLogs) => {
          return [...previousLogs, ...prevLogs];
        });
        setPagination((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching previous logs:", error);
    } finally {
      setFetchingPreviousLogs(false);
    }
  };

  const fetchAndUpdateMountLogs = async () => {
    try {
      const fetchedLogs = await fetcherLogs(
        [],
        toTimestamp,
        fromTimestamp,
        latestTimeRef.current
      );
      setLogs(() => {
        query !== "range" && enableSubscribtion();
        return fetchedLogs;
      });
      setPagination(2);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const scrollToBottom = () => {
    logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
  };

  return (
    <div className="pb-9 px-5 pt-3.5 border border-gray4 flex flex-col gap-3.5">
      <div className="text-xs text-right font-medium">
        Showing logs for {formatTimestamp(fromTimestamp)} &rarr;{" "}
        {formatTimestamp(toTimestamp)}
      </div>
      <div className="flex flex-col relative">
        {fetchingPreviousLogs && <LoadingPreviousLogs />}
        <div
          className="bg-logs_inner rounded-b-lg pb-10 pt-10 pr-3.5 pl-3 gap-2.5 flex flex-col h-[730px] overflow-y-auto relative"
          ref={logsContainerRef}
          onScroll={handleScroll}
        >
          {logs.map((log, index) => (
            <LogItem log={log} key={index} />
          ))}
        </div>
        {liveLogCount > 0 && query !== "range" && (
          <NewLogsIndicator
            liveLogCount={liveLogCount}
            scrollToBottom={scrollToBottom}
          />
        )}
      </div>
    </div>
  );
};

export default Logs;
