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
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./pages/error/NotFound";

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
            <Route
              path="/pills"
              element={<PrivateRoute component={<Pill />} />}
            />
            <Route
              path="/pill/detail/:id"
              element={<PrivateRoute component={<PillDetail />} />}
            />
            <Route
              path="/health"
              element={<PrivateRoute component={<Health />} />}
            />
            <Route
              path="/health/detail/:exerciseId"
              element={<PrivateRoute component={<HealthDetail />} />}
            />
            <Route
              path="/profiles"
              element={<PrivateRoute component={<Profile />} />}
            />
            <Route
              path="/schedule"
              element={<PrivateRoute component={<Schedule />} />}
            />
            <Route path="/social/redirect" element={<SocialLogin />} />
            />
            <Route
              path="/require"
              element={<PrivateRoute component={<RequiredInformation />} />}
            />
            <Route
              path="/form"
              element={<PrivateRoute component={<BodyAgeTest />} />}
            />
            <Route
              path="/result/:id"
              element={<PrivateRoute component={<Result />} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
