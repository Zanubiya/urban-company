import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api"

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await API.post("/auth/signup", {
        name, email, password, role
      });
      
      alert("Account created successfully! Please login and verify OTP.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white text-center py-4 rounded-top-4">
              <h2 className="mb-0 fw-bold">Create Account</h2>
              <p className="mb-0 mt-2 opacity-75">Join Urban Booking Platform</p>
            </div>
            
            <div className="card-body p-4 p-lg-5">
              <form onSubmit={signupHandler}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">I want to join as</label>
                  <div className="d-flex gap-3">
                    <div className="form-check flex-fill">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="customer"
                        value="customer"
                        checked={role === "customer"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="customer">
                        Customer
                      </label>
                    </div>
                    <div className="form-check flex-fill">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="vendor"
                        value="vendor"
                        checked={role === "vendor"}
                        onChange={(e) => setRole(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="vendor">
                        Vendor
                      </label>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 fw-bold py-2"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <p className="mb-0 text-muted">
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none fw-semibold">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;