
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Home from "./pages/Home";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/verify" element={<VerifyOtp />} />

        <Route
          path="/customer"
          element={<CustomerDashboard />}
        />

        <Route
          path="/vendor"
          element={<VendorDashboard />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;