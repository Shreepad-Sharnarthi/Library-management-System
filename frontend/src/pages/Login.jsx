import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid Username or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "1000px",
          maxWidth: "95%",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div className="row g-0">
          {/* Left Side */}
          <div
            className="col-md-6 text-white d-flex flex-column justify-content-center align-items-center p-5"
            style={{
              background:
                "linear-gradient(135deg,#1d4ed8,#4338ca)",
            }}
          >
            <i
              className="bi bi-book-half"
              style={{
                fontSize: "70px",
                marginBottom: "20px",
              }}
            ></i>

            <h1 className="fw-bold text-center">
              Library Management
            </h1>

            <p
              className="text-center mt-3"
              style={{ maxWidth: "350px" }}
            >
              Manage Books, Members and Borrowings
              with a modern dashboard.
            </p>

            <img
              src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
              alt="Library"
              style={{
                width: "240px",
                marginTop: "30px",
              }}
            />
          </div>

          {/* Right Side */}

          <div className="col-md-6 p-5">

            <h2 className="fw-bold mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-muted mb-4">
              Login to continue
            </p>

            <form onSubmit={handleLogin}>

              {/* Username */}

              <div className="mb-3">

                <label className="fw-semibold mb-2">
                  Username
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) =>
                      setUsername(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* Password */}

              <div className="mb-3">

                <label className="fw-semibold mb-2">
                  Password
                </label>

                <div className="input-group">

                  <span className="input-group-text">
                    <i className="bi bi-lock-fill"></i>
                  </span>

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="form-control form-control-lg"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    <i
                      className={
                        showPassword
                          ? "bi bi-eye-slash-fill"
                          : "bi bi-eye-fill"
                      }
                    ></i>
                  </button>

                </div>

              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div className="form-check">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="remember"
                  />

                  <label
                    className="form-check-label"
                    htmlFor="remember"
                  >
                    Remember Me
                  </label>

                </div>

                <a
                  href="#"
                  className="text-decoration-none"
                >
                  Forgot Password?
                </a>

              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 fw-bold"
                disabled={loading}
                style={{
                  borderRadius: "12px",
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Signing In...
                  </>
                ) : (
                  "Login"
                )}
              </button>

              <div className="text-center mt-4">
                Don't have an account?

                <Link
                  to="/register"
                  className="ms-2 fw-bold text-decoration-none"
                >
                  Register
                </Link>
              </div>

              <hr />

              <p
                className="text-center text-muted"
                style={{
                  fontSize: "14px",
                }}
              >
                © 2026 Library Management System
              </p>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}