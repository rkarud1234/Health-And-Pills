import { Route, Routes } from "react-router-dom";
import "./App.css";
import Health from "./pages/health/Health";
import Home from "./pages/Home";
import Pill from "./pages/Pill";
import Profile from "./pages/user/Profile";
import GlobalStyle from "./styled/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pills" element={<Pill />} />
          <Route path="/health" element={<Health />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
