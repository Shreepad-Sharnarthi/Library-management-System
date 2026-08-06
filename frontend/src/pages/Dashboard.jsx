import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import BooksChart from "../components/BooksChart";
import RecentBorrowings from "../components/RecentBorrowings";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState(0);
  const [members, setMembers] = useState(0);
  const [borrowings, setBorrowings] = useState(0);
  const username = localStorage.getItem("username") || "User";
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    Promise.all([
      api.get("books/", config),
      api.get("members/", config),
      api.get("borrowings/", config),
    ])
      .then(([booksRes, membersRes, borrowingsRes]) => {
        const books = booksRes.data.results || booksRes.data;
const members = membersRes.data.results || membersRes.data;
const borrowings = borrowingsRes.data.results || borrowingsRes.data;

setBooks(books.length);
setMembers(members.length);
setBorrowings(borrowings.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MainLayout>

      {/* Welcome Banner */}

      <div
        className="p-4 rounded-4 shadow mb-4"
        style={{
          background: "linear-gradient(135deg,#6C4DF6,#8A63FF)",
        }}
      >
       <h2 className="fw-bold text-white mb-2">
  👋 Welcome Back, {username}
</h2>
        <p className="text-white-50 mb-0">
          Here's today's overview of your Library Management System.
        </p>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-4">

        <div className="col-lg-4">

          <DashboardCard
            title="Total Books"
            value={books}
            icon="📚"
            color="linear-gradient(135deg,#6C4DF6,#8A63FF)"
          />

        </div>

        <div className="col-lg-4">

          <DashboardCard
            title="Members"
            value={members}
            icon="👥"
            color="linear-gradient(135deg,#6C4DF6,#8A63FF)"
          />

        </div>

        <div className="col-lg-4">

          <DashboardCard
            title="Borrowings"
            value={borrowings}
            icon="📖"
            color="linear-gradient(135deg,#6C4DF6,#8A63FF)"
          />

        </div>

      </div>

      {/* Chart + Quick Actions */}

      <div className="row g-4">

        <div className="col-lg-8">
          <BooksChart />
        </div>

        <div className="col-lg-4">

          <div className="card p-4 h-100">

            <h5 className="fw-bold mb-4">
              ⚡ Quick Actions
            </h5>

            <button
              className="btn btn-primary w-100 mb-3"
              onClick={() => navigate("/books")}
            >
              📚 Add Book
            </button>

            <button
              className="btn btn-success w-100 mb-3"
              onClick={() => navigate("/members")}
            >
              👤 Add Member
            </button>

            <button
              className="btn btn-warning w-100 mb-3 text-white"
              onClick={() => navigate("/borrowings")}
            >
              📖 Issue Book
            </button>

            <button
              className="btn btn-danger w-100"
              onClick={() => navigate("/reports")}
            >
              📊 Download Reports
            </button>

          </div>

        </div>

      </div>

      {/* Recent Borrowings */}

      <div className="mt-4">

        <RecentBorrowings />

      </div>

    </MainLayout>
  );
}