import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
    { name: "Books", path: "/books", icon: "bi-book" },
    { name: "Members", path: "/members", icon: "bi-people" },
    { name: "Borrowings", path: "/borrowings", icon: "bi-arrow-left-right" },
    { name: "Reports", path: "/reports", icon: "bi-bar-chart" },
  ];

  return (
    <div
      className="text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#5B21B6,#7C3AED)",
      }}
    >
      <div className="text-center mb-5"
      style={{ color: "#ffffff" }}>
    <h2 className="fw-bold mb-1">
      📚 Library</h2>
    <small style={{ color: "#ffffff" }}>
        Management System
    </small>
</div>

      {menus.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `d-flex align-items-center text-decoration-none mb-3 px-3 py-3 ${
              isActive ? "sidebar-active" : "sidebar-link"
            }`
          }
        >
          <i className={`${item.icon} me-3 fs-5`}></i>
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}

const role = localStorage.getItem("role");

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: "bi-speedometer2" },
  { name: "Books", path: "/books", icon: "bi-book" },
  { name: "Members", path: "/members", icon: "bi-people" },
  { name: "Borrowings", path: "/borrowings", icon: "bi-arrow-left-right" },
];

if (role === "ADMIN") {
  menus.push({
    name: "Reports",
    path: "/reports",
    icon: "bi-bar-chart",
  });
}