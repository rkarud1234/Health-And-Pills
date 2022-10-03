import { Route, Routes } from "react-router-dom";
import "./App.css";
import Health from "./pages/health/Health";
import HealthDetail from "./pages/health/HealthDetail";
import Home from "./pages/Home";
import Pill from "./pages/Pill";
import PillDetail from "./pages/PillDetail";
import Schedule from "./pages/Schedule";
import SocialLogin from "./pages/user/SocialLogin";
import GlobalStyle from "./styled/GlobalStyle";
import BodyAgeTest from "./pages/test/BodyAgeTest";
import Result from "./pages/test/Result";
import RequiredInformation from "./pages/user/requirementInformation/RequiredInformation";
import { Suspense, lazy } from "react";
import Loading from "./components/layouts/Loading";

const Profile = lazy(() => import("./pages/user/Profile"));
function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Suspense
          fallback={
            <>
              <Loading />
            </>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pills" element={<Pill />} />
            <Route path="/pill/detail/:id" element={<PillDetail />} />
            <Route path="/health" element={<Health />} />
            <Route
              path="/health/detail/:exerciseId"
              element={<HealthDetail />}
            />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/social/redirect" element={<SocialLogin />} />
            <Route path="/require" element={<RequiredInformation />} />
            <Route path="/form" element={<BodyAgeTest />} />
            <Route path="/result/:id" element={<Result />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
