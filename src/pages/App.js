import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import Addcar from './Addcar.js';
import Bookings from './Bookings.js';
import Bookcar from './Bookcar.js';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/Addcar" element={<Addcar />} />
        <Route path="/Bookcar" element={<Bookcar />} />
        
        {/* Handle unknown routes */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
