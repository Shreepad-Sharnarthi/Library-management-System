import { FaBell, FaUserCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const role = localStorage.getItem("role") || "LIBRARIAN";

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav
      className="navbar px-4 py-3 shadow-sm"
      style={{
        background: "linear-gradient(90deg, #5B21B6, #7C3AED)",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
      }}
    >
      <div className="container-fluid">

        {/* Left Side */}
        <div>
          <h2
            className="fw-bold"
            style={{ color: "#ffffff" }}
          >
            📚 Library Management System
          </h2>

          <small style={{ color: "#E9D5FF" }}>
            Manage Books • Members • Borrowings
          </small>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center">

          {/* Search */}
          <div
            className="d-flex align-items-center bg-white rounded-pill px-3 me-4"
            style={{
              height: "42px",
              width: "260px",
            }}
          >
            <FaSearch color="#7C3AED" />

            <input
              type="text"
              placeholder="Search..."
              className="form-control border-0 shadow-none"
              style={{
                background: "transparent",
              }}
            />
          </div>

          {/* Notification */}
          <button
            className="btn btn-light rounded-circle me-3"
            style={{
              width: "45px",
              height: "45px",
            }}
          >
            <FaBell color="#7C3AED" />
          </button>

          {/* User Profile */}
          <div
            className="d-flex align-items-center px-3 py-2 rounded-pill"
            style={{
              background: "rgba(255,255,255,.15)",
            }}
          >
            <FaUserCircle size={38} color="white" />

            <div className="ms-2">
              <div className="text-white fw-bold">
                {username}
              </div>

              <small style={{ color: "#E9D5FF" }}>
                {role}
              </small>
            </div>
          </div>

          {/* Logout */}
          <button
            className="btn btn-light rounded-pill ms-3 d-flex align-items-center"
            style={{ color: "#7C3AED", fontWeight: 600 }}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}