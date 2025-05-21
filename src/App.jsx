import { Route, Routes } from "react-router-dom";
import "./App.css";
import ManageSongs from "./component/ManageSongs";
import OverlaySongList from "./component/OverlaySongList";

function App() {
  return (
    <div className="bg-transparent">
      <Routes>
        <Route path="/" element={<ManageSongs />} />
        <Route path="/m" element={<ManageSongs />} />
        <Route path="/o" element={<OverlaySongList />} />
      </Routes>
    </div>
  );
}

export default App;
