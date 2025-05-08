import { Routes, Route } from 'react-router-dom';
import Welcome from "./components/Welcome/Welcome";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;
