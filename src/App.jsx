import { Route, Routes } from "react-router-dom";
import "./App.css";
import ManageSongs from "./component/ManageSongs";
import OverlaySongList from "./component/OverlaySongList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ManageSongs />} />
        <Route path="/m" element={<ManageSongs />} />
        <Route path="/o" element={<OverlaySongList />} />
      </Routes>
    </>
  );
}

export default App;
