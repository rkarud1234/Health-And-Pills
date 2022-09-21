import { Route, Routes } from "react-router-dom";
import "./App.css";
import Health from "./pages/health/Health";
import Home from "./pages/Home";
import Pill from "./pages/Pill";
import PillDetail from "./pages/PillDetail";
import Profile from "./pages/user/Profile";
import SocialLogin from "./pages/user/SocialLogin";
import GlobalStyle from "./styled/GlobalStyle";
import BodyAgeTest from "./pages/test/BodyAgeTest";
import Result from "./pages/test/Result";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/social/redirect" element={<SocialLogin />} />
          <Route path="/form" element={<BodyAgeTest />} />
          <Route path="/result/:id" element={<Result />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
