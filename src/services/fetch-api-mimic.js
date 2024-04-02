import { MimicLogs } from "./api-mimic";
import { lastLogsTsRange } from "../components/Logs";

export const ISOtoTimestamp = (iso) => {
  return new Date(iso).getTime();
};

export const fetcherLogs = async (logs, to, from, query) => {
  try {
    const toTs = ISOtoTimestamp(to);
    const fromTs = ISOtoTimestamp(from);
    const tsDifference =
      query === "range" ? toTs - fromTs : lastLogsTsRange[query];

    const offsetTs =
      logs.length > 0
        ? logs[0].timestamp
        : query !== "range"
        ? Date.now()
        : toTs;
    const previousLogs = (
      await MimicLogs.fetchPreviousLogs({
        startTs: offsetTs - tsDifference / 10,
        endTs: offsetTs,
        limit: 40,
      })
    ).reverse();
    return previousLogs;
  } catch (error) {
    console.error("Error fetching previous logs:", error);
    return null;
  }
};
