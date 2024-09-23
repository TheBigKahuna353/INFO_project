import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Vehicle from './pages/Vehicle';


// for each page, create a route, so it runs the code for the page
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:rego" element={<Vehicle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
