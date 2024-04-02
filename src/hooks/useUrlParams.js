import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ISOtoTimestamp } from "../utils/converters";
import { lastLogsTsRange } from "../components/Logs";

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const to = searchParams.get("to");
  const from = searchParams.get("from");
  const latestTimeRef = useRef(Date.now());

  const decodedTo = decodeURIComponent(to);
  const decodedFrom = decodeURIComponent(from);

  const fromTimestamp =
    query === "range"
      ? ISOtoTimestamp(decodedFrom)
      : latestTimeRef.current - lastLogsTsRange[query];
  const toTimestamp =
    query === "range" ? ISOtoTimestamp(decodedTo) : latestTimeRef.current;

  return { fromTimestamp, toTimestamp, latestTimeRef, query, setSearchParams };
};
