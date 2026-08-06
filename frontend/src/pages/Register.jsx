import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", {
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }

    setLoading(false);
  };

  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg,#2563eb,#7c3aed)"
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "600px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center fw-bold mb-4">
          Create Account
        </h2>

        <form onSubmit={register}>

          <div className="mb-3">
            <label>Full Name</label>

            <input
              className="form-control"
              name="full_name"
              value={form.full_name}
              onChange={changeHandler}
              required
            />
          </div>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label>Username</label>

              <input
                className="form-control"
                name="username"
                value={form.username}
                onChange={changeHandler}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>Phone</label>

              <input
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={changeHandler}
              />

            </div>

          </div>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={changeHandler}
              required
            />

          </div>

          <div className="row">

            <div className="col-md-6 mb-3">

              <label>Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={changeHandler}
                required
              />

            </div>

            <div className="col-md-6 mb-3">

              <label>Confirm Password</label>

              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={changeHandler}
                required
              />

            </div>

          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <div className="text-center mt-4">
            Already have an account?
            <Link
              to="/"
              className="ms-2 fw-bold text-decoration-none"
            >
              Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}