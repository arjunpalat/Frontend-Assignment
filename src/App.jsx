import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logs from "./components/Logs/Logs";
import Metrics from "./components/Metrics/Metrics";
import Navbar from "./components/Navbar/Navbar";
import ChartComponent from "./components/Chart/ChartComponent";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/logs" element={<Logs />} />
        <Route path="/" element={<p>Welcome!</p>} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/chart" element={<ChartComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
