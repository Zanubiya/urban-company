import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
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
      
      // Check if user is customer
      if (parsedUser.role !== "customer") {
        alert("Access denied. Customer only area.");
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
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Customer Dashboard</h3>
          <button onClick={logoutHandler} className="btn btn-danger">
            Logout
          </button>
        </div>
        <div className="card-body">
          {user && (
            <>
              <h4>Welcome, {user.name}!</h4>
              <p>Email: {user.email}</p>
              <p>Role: Customer</p>
              <hr />
              <p>Browse and book services here.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;