import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Vehicle from './pages/Vehicle';
import NotFound from './pages/NotFound';
import Relocations from './pages/Relocations';
import Trips from './pages/Trips';
import Trip from './pages/Trip';
import Relocation from './pages/Relocation';
import Charts from './pages/Charts';
import SignIn from './pages/Login';
import SignUp from './pages/Register';

// for each page, create a route, so it runs the code for the page
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:rego" element={<Vehicle />} />
          <Route path="*" element={<NotFound/>} />
          <Route path="/relocations" element={<Relocations/>} />
          <Route path="/trips" element={<Trips/>} />
          <Route path="/trips/:trip_id" element={<Trip/>} />
          <Route path="/relocations/:id" element={<Relocation/>} />
          <Route path="/charts" element={<Charts/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/register" element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
