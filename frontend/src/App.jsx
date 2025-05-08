import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import gapsiLogo from "./assets/logo.png";
import Providers from "./components/Providers/Providers";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleWelcome = () => {
    navigate("/");
  };

  return (
    <div className="app">
      <div className="con">
        <header className="header">
          <img src={gapsiLogo} alt="Gapsi Logo" className="logo" onClick={handleWelcome} />
          <h1>e-Commerce Gapsi</h1>
        </header>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/providers" element={<Providers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
