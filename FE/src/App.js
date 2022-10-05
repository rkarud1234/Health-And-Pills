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
import { Suspense, lazy, useEffect } from "react";
import Loading from "./components/layouts/Loading";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./pages/error/NotFound";
import firebase from "firebase";

const Profile = lazy(() => import("./pages/user/Profile"));
function App() {
  useEffect(async () => {
    const config = {
      apiKey: "AIzaSyCNqfN1A3XlKUf4lwlZAzqYK-JnVP7oKPI",
      authDomain: "healthpill-53153.firebaseapp.com",
      projectId: "healthpill-53153",
      storageBucket: "healthpill-53153.appspot.com",
      messagingSenderId: "590917719651",
      appId: "1:590917719651:web:37df51b239cee25ff88a56"
    };
    firebase.initializeApp(config);
    const messaging = firebase.messaging();

    await messaging
      .requestPermission()
      .then(async () => {
        const fcmToken = await messaging.getToken({
          vapidKey:"BFV5UXzU24Y0YpYbAZYgkJfo0b5q42iy5cthyTKAl7to2zX5oe5DEn89_qEXrvOGpFidSO2lu5q00_LYIaS84yA",
        });
        window.localStorage.setItem("FCM_TOKEN", fcmToken);
        //토큰을 받는 함수를 추가!
      })
      .catch(function (err) {
        // console.log("fcm에러 : ", err);
      });
    messaging.onTokenRefresh(() => {
      messaging
        .getToken({
          vapidKey:"BFV5UXzU24Y0YpYbAZYgkJfo0b5q42iy5cthyTKAl7to2zX5oe5DEn89_qEXrvOGpFidSO2lu5q00_LYIaS84yA",
        })
        .then(function (refreshedToken) {
          window.localStorage.setItem("FCM_TOKEN", refreshedToken); //토큰이 재 생성될 경우 다시 저장
        })
        .catch(function (err) {
          // console.log("Unable to retrieve refreshed token ", err);
        });
    });

    messaging.onMessage((payload) => {
      const title = payload.data.content;
      alert(title);
    });
  }, []);


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
              path="/pills/detail/:id"
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
            <Route path="/require" element={<RequiredInformation />} />
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
