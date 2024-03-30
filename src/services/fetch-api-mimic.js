import { MimicLogs } from "@mimic/mimic-logs";

export const fetchLogs = async (logs, tsDifference) => {
  const offsetTs = logs.length > 0 ? logs[0].timestamp : Date.now();
  const previousLogs = (
    await MimicLogs.fetchPreviousLogs({
      startTs: offsetTs - tsDifference,
      endTs: offsetTs,
      limit: 100,
    })
  ).reverse();
};
