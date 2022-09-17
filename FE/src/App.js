import { Route, Routes } from "react-router-dom";
import "./App.css";
import Health from "./pages/health/Health";
import HealthDetail from "./pages/health/HealthDetail";
import Home from "./pages/Home";
import Pill from "./pages/Pill";
import PillDetail from "./pages/PillDetail";
import Profile from "./pages/user/Profile";
import Schedule from "./pages/Schedule";
import GlobalStyle from "./styled/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pills" element={<Pill />} />
          <Route path="/pill/detail/:id" element={<PillDetail />} />
          <Route path="/health" element={<Health />} />
          <Route path="/healthDetail" element={<HealthDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
