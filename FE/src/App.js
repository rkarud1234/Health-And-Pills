import { Route, Routes } from "react-router-dom";
import "./App.css";
import Health from "./pages/Health";
import Home from "./pages/Home";
import Pill from "./pages/Pill";
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
        </Routes>
      </div>
    </>
  );
}

export default App;
