import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const navigate = useNavigate();

  // =========================
  // GET EMAIL FROM SESSION
  // =========================
  useEffect(() => {
    const tempEmail = sessionStorage.getItem("tempEmail");

    if (!tempEmail) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    setEmail(tempEmail);
  }, [navigate]);

  // =========================
  // VERIFY OTP
  // =========================
  const verifyHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Verifying OTP for:", email);

      // ❌ FIXED: removed /api (baseURL already has it)
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      console.log("Verify response:", res.data);

      // Save login data directly (BEST PRACTICE)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Clear temp storage
      sessionStorage.removeItem("tempEmail");
      sessionStorage.removeItem("tempPassword");
      sessionStorage.removeItem("tempUserRole");

      alert("Email verified successfully!");

      // Redirect based on role
      const role = res.data.user.role;

      if (role === "customer") {
        navigate("/customer");
      } else if (role === "vendor") {
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

  // =========================
  // RESEND OTP
  // =========================
  const resendOtp = async () => {
    if (resendCountdown > 0) return;

    setLoading(true);
    try {
      await API.post("/auth/resend-otp", { email });

      alert("OTP resent successfully!");

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

            {/* HEADER */}
            <div className="card-header bg-warning text-dark text-center py-4 rounded-top-4">
              <h2 className="mb-0 fw-bold">Verify OTP</h2>
              <p className="mb-0 mt-2">Enter the 6-digit code sent to your email</p>
            </div>

            {/* BODY */}
            <div className="card-body p-4">

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={verifyHandler}>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    value={email}
                    readOnly
                  />
                </div>

                {/* OTP */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">OTP</label>
                  <input
                    type="text"
                    className="form-control text-center"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                {/* RESEND OTP */}
                <div className="text-center mt-3">
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