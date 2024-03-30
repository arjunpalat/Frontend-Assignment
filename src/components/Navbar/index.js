import logo from "../../assets/tf_logo.svg";
import logs from "../../assets/list.svg";
import logs_active from "../../assets/list-active.svg";
import metrics from "../../assets/metrics.svg";
import metrics_active from "../../assets/metrics-active.svg";
import chevron from "../../assets/chevron.svg";

const dropdownOptions = [
  { label: "Last 5 minutes", value: 5 * 60 * 1000 },
  { label: "Last 15 minutes", value: 15 * 60 * 1000 },
  { label: "Last 30 minutes", value: 30 * 60 * 1000 },
  { label: "Last 1 hour", value: 60 * 60 * 1000 },
  { label: "Last 3 hours", value: 3 * 60 * 60 * 1000 },
  { label: "Last 6 hours", value: 6 * 60 * 60 * 1000 },
];

export {
  logo,
  logs,
  logs_active,
  metrics,
  metrics_active,
  chevron,
  dropdownOptions,
};
