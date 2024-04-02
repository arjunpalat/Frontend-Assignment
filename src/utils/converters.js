export const ISOtoTimestamp = (iso) => {
  return new Date(iso).getTime();
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ("0" + date.getDate()).slice(-2); // Add leading zero if needed
  const hours = ("0" + date.getHours()).slice(-2); // Add leading zero if needed
  const minutes = ("0" + date.getMinutes()).slice(-2); // Add leading zero if needed
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
export const formatLogTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate().toString();
  const hours = ("0" + date.getHours()).slice(-2); // Add leading zero if needed
  const minutes = ("0" + date.getMinutes()).slice(-2); // Add leading zero if needed
  const seconds = ("0" + date.getSeconds()).slice(-2); // Add leading zero if needed
  const milliseconds = ("00" + date.getMilliseconds()).slice(-3); // Add leading zeros if needed
  return [month, day, `${hours}:${minutes}:${seconds}.${milliseconds}`];
};

export const toLocaleISOString = (ts) => {
  ts = new Date(ts);
  var offsetMs = ts.getTimezoneOffset() * 60 * 1000;
  var localDate = new Date(ts.getTime() - offsetMs);
  var iso = localDate.toISOString();
  return iso.slice(0, 19);
};

export const generateEncodedUrl = (from, to) => {
  const encodedFrom = encodeURIComponent(toLocaleISOString(from));
  const encodedTo = encodeURIComponent(toLocaleISOString(to));
  return `/logs?query=range&from=${encodedFrom}&to=${encodedTo}`;
};

export const generateRangeQueryUrlParams = (from, to) => {
  const encodedFrom = encodeURIComponent(toLocaleISOString(from));
  const encodedTo = encodeURIComponent(toLocaleISOString(to));
  const query = "range";
  return { query, from: encodedFrom, to: encodedTo };
};
