import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "customer") navigate("/customer");
      if (user?.role === "vendor") navigate("/vendor");
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email, password
      });
      
      console.log("Full login response:", res);
      console.log("Response data:", res.data);
      console.log("User object:", res.data.user);
      console.log("isVerified value:", res.data.user?.isVerified);
      
      // Check if user is verified (handle both field names)
      const isVerified = res.data.user?.isVerified || res.data.user?.verified;
      
      if (!isVerified) {
        console.log("User not verified, storing temp data and redirecting to verify");
        // Store email and password temporarily
        sessionStorage.setItem("tempEmail", email);
        sessionStorage.setItem("tempPassword", password);
        sessionStorage.setItem("tempUserRole", res.data.user?.role || "customer");
        alert("Please verify your OTP first");
        navigate("/verify");
        return;
      }
      
      // If verified, store token and redirect
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      alert("Login successful!");
      
      // Redirect based on role
      if (res.data.user.role === "customer") {
        navigate("/customer");
      } else if (res.data.user.role === "vendor") {
        navigate("/vendor");
      }
      
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      alert(errorMessage);
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
              <h2 className="mb-0 fw-bold">Welcome Back</h2>
              <p className="mb-0 mt-2 opacity-75">Login to your account</p>
            </div>
            
            <div className="card-body p-4 p-lg-5">
              <form onSubmit={loginHandler}>
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
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="alert alert-danger mb-3">{error}</div>
                )}
                
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 fw-bold py-2"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <p className="mb-0 text-muted">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-decoration-none fw-semibold">
                    Create Account
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

export default Login;