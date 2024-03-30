import { MimicLogs } from "./api-mimic";

export const fetcherLogs = async (logs, tsDifference) => {
  try {
    const offsetTs = logs.length > 0 ? logs[0].timestamp : Date.now();
    const previousLogs = (
      await MimicLogs.fetchPreviousLogs({
        startTs: offsetTs - tsDifference / 10,
        endTs: offsetTs,
        limit: 10,
      })
    ).reverse();
    return previousLogs;
  } catch (error) {
    console.error("Error fetching previous logs:", error);
    return null;
  }
};
