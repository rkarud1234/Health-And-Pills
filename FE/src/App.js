import { Route, Routes } from "react-router-dom";
import "./App.css";
import Health from "./pages/health/Health";
import HealthDetail from "./pages/health/HealthDetail";
import Home from "./pages/Home";
import Pill from "./pages/Pill";
import PillDetail from "./pages/PillDetail";
import Profile from "./pages/user/Profile";
import Schedule from "./pages/Schedule";
import SocialLogin from "./pages/user/SocialLogin";
import GlobalStyle from "./styled/GlobalStyle";
import BodyAgeTest from "./pages/test/BodyAgeTest";
import Result from "./pages/test/Result";
import RequiredInformation from "./pages/user/requirementInformation/RequiredInformation";

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
          <Route path="/health/detail/:exerciseId" element={<HealthDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/social/redirect" element={<SocialLogin />} />
          <Route path="/require" element={<RequiredInformation />} />
          <Route path="/form" element={<BodyAgeTest />} />
          <Route path="/result/:id" element={<Result />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
