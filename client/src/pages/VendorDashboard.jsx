import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (!token) {
      navigate("/login");
      return;
    }
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Check if user is vendor
      if (parsedUser.role !== "vendor") {
        alert("Access denied. Vendor only area.");
        navigate("/");
      }
    }
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Vendor Dashboard</h3>
          <button onClick={logoutHandler} className="btn btn-danger">
            Logout
          </button>
        </div>
        <div className="card-body">
          {user && (
            <>
              <h4>Welcome, {user.name}!</h4>
              <p>Email: {user.email}</p>
              <p>Role: Vendor</p>
              <hr />
              <p>Manage your services and bookings here.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;