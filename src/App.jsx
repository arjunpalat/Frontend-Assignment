import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logs from "./components/Logs";
import Metrics from "./components/Metrics";
import Navbar from "./components/Navbar";
import ChartComponent from "./components/ChartComponent";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/logs" element={<Logs />} />
        <Route path="/" element={<p>Hello Para</p>} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/chart" element={<ChartComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
