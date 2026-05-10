import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from session storage
    const tempEmail = sessionStorage.getItem("tempEmail");
    console.log("Temp email from storage:", tempEmail);
    
    if (tempEmail) {
      setEmail(tempEmail);
    } else {
      // No email found, redirect to login
      alert("Session expired. Please login again.");
      navigate("/login");
    }
  }, [navigate]);

  const verifyHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log("Verifying OTP for:", email);
      
      // Verify OTP
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email, otp
      });
      
      console.log("Verify response:", res.data);
      
      // After verification, login to get token
      const tempPassword = sessionStorage.getItem("tempPassword");
      const userRole = sessionStorage.getItem("tempUserRole");
      
      console.log("Logging in with temp password");
      
      const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password: tempPassword
      });
      
      console.log("Login after verify response:", loginRes.data);
      
      // Store token and user data
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      
      // Clear temp storage
      sessionStorage.removeItem("tempEmail");
      sessionStorage.removeItem("tempPassword");
      sessionStorage.removeItem("tempUserRole");
      
      alert("Email verified successfully!");
      
      // Redirect based on role
      if (userRole === "customer" || loginRes.data.user.role === "customer") {
        navigate("/customer");
      } else if (userRole === "vendor" || loginRes.data.user.role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/");
      }
      
    } catch (error) {
      console.error("Verification error:", error.response?.data);
      setError(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (resendCountdown > 0) return;
    
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/resend-otp", { email });
      alert("OTP resent successfully! Check your email.");
      setResendCountdown(60);
      
      const timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) clearInterval(timer);
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      alert(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-warning text-dark text-center py-4 rounded-top-4">
              <h2 className="mb-0 fw-bold">Verify OTP</h2>
              <p className="mb-0 mt-2">Enter the 6-digit code sent to your email</p>
            </div>
            
            <div className="card-body p-4 p-lg-5">
              {error && (
                <div className="alert alert-danger mb-3">{error}</div>
              )}
              
              <form onSubmit={verifyHandler}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control form-control-lg bg-light"
                    value={email}
                    readOnly
                  />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">OTP Code</label>
                  <input
                    type="text"
                    className="form-control form-control-lg text-center"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-warning btn-lg w-100 fw-bold py-2 mb-3"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                
                <div className="text-center">
                  <button 
                    type="button"
                    className="btn btn-link"
                    onClick={resendOtp}
                    disabled={resendCountdown > 0}
                  >
                    {resendCountdown > 0 
                      ? `Resend OTP in ${resendCountdown}s` 
                      : "Resend OTP"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;