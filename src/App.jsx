import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logs from "./components/Logs/Logs";
import Metrics from "./components/Metrics/Metrics";
import Navbar from "./components/Navbar/Navbar";
import ChartComponent from "./components/Chart/ChartComponent";
import NotFound from "./components/Error/NotFound";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/logs" element={<Logs />} />
        <Route
          path="/"
          element={
            <div className="text-center">
              <h1 className="text-red-500 p-8 text-3xl">
                Please choose Metrics or Logs to view updates.
              </h1>
            </div>
          }
        />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/chart" element={<ChartComponent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
