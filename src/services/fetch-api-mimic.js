import { MimicLogs } from "./api-mimic";

export const fetcherLogs = async (logs, to, from) => {
  try {
    const tsDifference = to - from;
    const offsetTs = logs.length > 0 ? logs[0].timestamp : to;

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
