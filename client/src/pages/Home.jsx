import { Link } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("services");

  return (
    <>
      {/* Hero Section with Background Image */}
      <div className="position-relative" style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        minHeight: "600px",
        marginTop: "-1rem"
      }}>
        <div className="container pt-5">
          {/* Navigation Bar */}
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid px-0">
              <Link className="navbar-brand fw-bold fs-2" to="/">
                Urban<span className="text-warning">Booking</span>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
                  <li className="nav-item"><Link className="nav-link text-white" to="/services">Services</Link></li>
                  <li className="nav-item"><Link className="nav-link text-white" to="/about">About Us</Link></li>
                  <li className="nav-item"><Link className="nav-link text-white" to="/contact">Contact</Link></li>
                  <li className="nav-item"><Link className="btn btn-outline-light ms-2" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="btn btn-warning ms-2" to="/signup">Sign Up</Link></li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="text-center text-white mt-5 pt-5">
            <h1 className="display-3 fw-bold mb-3">Find & Book Top Services</h1>
            <p className="fs-4 mb-4">Professional service providers at your doorstep</p>
            
            {/* Search Box */}
            <div className="card shadow-lg border-0 rounded-pill overflow-hidden mx-auto" style={{ maxWidth: "700px" }}>
              <div className="card-body p-2">
                <div className="row g-2">
                  <div className="col-md-4">
                    <select 
                      className="form-select border-0 fs-6"
                      value={searchCategory}
                      onChange={(e) => setSearchCategory(e.target.value)}
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <option value="services">Services</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="painting">Painting</option>
                      <option value="repair">Repair</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control border-0 fs-6"
                      placeholder="What service do you need?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ backgroundColor: "#f8f9fa" }}
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-warning w-100 rounded-pill fw-semibold">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container my-5 py-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Popular Services</h2>
          <p className="text-muted">Choose from thousands of trusted service providers</p>
        </div>
        
        <div className="row g-4">
          {[
            { icon: "🔧", name: "Plumbing", desc: "Pipe repair, installation", color: "primary" },
            { icon: "⚡", name: "Electrical", desc: "Wiring, repair, installation", color: "warning" },
            { icon: "🧹", name: "Cleaning", desc: "Home, office, deep cleaning", color: "success" },
            { icon: "🎨", name: "Painting", desc: "Wall painting, texture", color: "info" },
            { icon: "🛠️", name: "Repair", desc: "AC, fridge, appliance repair", color: "danger" },
            { icon: "🚚", name: "Moving", desc: "Packers & movers", color: "secondary" }
          ].map((service, index) => (
            <div className="col-md-4 col-lg-2" key={index}>
              <div className="card h-100 text-center border-0 shadow-sm hover-shadow transition">
                <div className="card-body">
                  <div className={`display-1 mb-3 bg-${service.color} bg-opacity-10 rounded-circle p-3 d-inline-block`}>
                    {service.icon}
                  </div>
                  <h5 className="fw-bold mt-2">{service.name}</h5>
                  <p className="text-muted small">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>
            <p className="text-muted">Simple steps to get your service done</p>
          </div>
          
          <div className="row text-center">
            {[
              { step: "1", title: "Search", desc: "Find the service you need", icon: "🔍" },
              { step: "2", title: "Book", desc: "Choose provider & schedule", icon: "📅" },
              { step: "3", title: "Pay", desc: "Secure online payment", icon: "💳" },
              { step: "4", title: "Service", desc: "Professional service delivery", icon: "✅" }
            ].map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="position-relative">
                  <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "70px", height: "70px", fontSize: "2rem" }}>
                    {item.icon}
                  </div>
                  <h5 className="fw-bold mt-3">{item.title}</h5>
                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-3">
            <div className="display-4 fw-bold text-primary">10K+</div>
            <p className="text-muted">Happy Customers</p>
          </div>
          <div className="col-md-3">
            <div className="display-4 fw-bold text-primary">500+</div>
            <p className="text-muted">Service Providers</p>
          </div>
          <div className="col-md-3">
            <div className="display-4 fw-bold text-primary">50+</div>
            <p className="text-muted">Cities Covered</p>
          </div>
          <div className="col-md-3">
            <div className="display-4 fw-bold text-primary">24/7</div>
            <p className="text-muted">Customer Support</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to get started?</h2>
          <p className="mb-4">Join thousands of satisfied customers using UrbanBooking</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/signup" className="btn btn-warning btn-lg fw-semibold px-4">
              Sign Up Now
            </Link>
            <Link to="/login" className="btn btn-outline-light btn-lg px-4">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h3 className="fw-bold">Urban<span className="text-warning">Booking</span></h3>
              <p className="text-muted">Book trusted service professionals with ease.</p>
            </div>
            <div className="col-md-2 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
                <li><Link to="/services" className="text-muted text-decoration-none">Services</Link></li>
                <li><Link to="/about" className="text-muted text-decoration-none">About</Link></li>
                <li><Link to="/contact" className="text-muted text-decoration-none">Contact</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5>Support</h5>
              <ul className="list-unstyled">
                <li><Link to="/help" className="text-muted text-decoration-none">Help Center</Link></li>
                <li><Link to="/terms" className="text-muted text-decoration-none">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-4">
              <h5>Contact Us</h5>
              <p className="text-muted">Email: support@urbanbooking.com</p>
              <p className="text-muted">Phone: 1800-123-4567</p>
            </div>
          </div>
          <hr className="bg-secondary" />
          <div className="text-center text-muted">
            <p>&copy; 2024 UrbanBooking. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style>{`
        .transition {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .bg-opacity-10 {
          --bs-bg-opacity: 0.1;
        }
      `}</style>
    </>
  );
}

export default Home;