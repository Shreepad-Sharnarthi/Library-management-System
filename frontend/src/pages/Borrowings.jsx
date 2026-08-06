import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import * as bootstrap from "bootstrap";

export default function Borrowings() {
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    book: "",
    member: "",
    due_date: "",
    status: "ISSUED",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadBorrowings();
    loadBooks();
    loadMembers();
  }, []);

  const token = localStorage.getItem("access_token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadBorrowings = async () => {
    try {
      const res = await api.get("borrowings/", config);
      setBorrowings(res.data.results || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBooks = async () => {
    try {
      const res = await api.get("books/", config);
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMembers = async () => {
    try {
      const res = await api.get("members/", config);
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isEditing) {

        await api.put(
          `borrowings/${editingId}/`,
          formData,
          config
        );

        alert("Borrowing Updated Successfully");

      } else {

        await api.post(
          "borrowings/",
          formData,
          config
        );

        alert("Book Issued Successfully");

      }

      loadBorrowings();

      setFormData({
        book: "",
        member: "",
        due_date: "",
        status: "ISSUED",
      });

      setEditingId(null);
      setIsEditing(false);

      bootstrap.Modal.getInstance(
        document.getElementById("borrowModal")
      )?.hide();

    } catch (err) {

      console.log(err);

      alert("Operation Failed");

    }
  };

  const handleEdit = (item) => {

    setIsEditing(true);

    setEditingId(item.id);

    setFormData({
      book: item.book,
      member: item.member,
      due_date: item.due_date,
      status: item.status,
    });

    new bootstrap.Modal(
      document.getElementById("borrowModal")
    ).show();

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete borrowing record?")) return;

    try {

      await api.delete(
        `borrowings/${id}/`,
        config
      );

      alert("Deleted Successfully");

      loadBorrowings();

    } catch (err) {

      console.log(err);

    }

  };

  const filteredBorrowings = borrowings.filter((item) =>
    item.book_title?.toLowerCase().includes(search.toLowerCase()) ||
    item.member_name?.toLowerCase().includes(search.toLowerCase()) ||
    item.status?.toLowerCase().includes(search.toLowerCase())
  );
  return (
  <MainLayout>

    <div className="d-flex justify-content-between align-items-center mb-4">

      <h2 className="fw-bold text-primary">
    📖 Borrowings Management
</h2>
      <button
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#borrowModal"
      >
        + Issue Book
      </button>

    </div>

    <div className="card">

      <div className="card-body">

        <input
          className="form-control mb-4"
          placeholder="🔍 Search Borrowings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-light">

              <tr>

                <th>ID</th>
                <th>Book</th>
                <th>Member</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Fine</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredBorrowings.map((item) => (

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.book_title}</td>

                  <td>{item.member_name}</td>

                  <td>{item.issue_date}</td>

                  <td>{item.due_date}</td>

                  <td>

                    ₹{item.fine}

                  </td>

                  <td>

                    <span
                      className={`badge ${
                        item.status === "ISSUED"
                          ? "bg-primary"
                          : item.status === "RETURNED"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    {isAdmin && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

    <div
      className="modal fade"
      id="borrowModal"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <form onSubmit={handleSubmit}>

            <div className="modal-header">

              <h5>

                {isEditing ? "Edit Borrowing" : "Issue Book"}

              </h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>

            </div>

            <div className="modal-body">

              <div className="mb-3">

                <label>Book</label>

                <select
                  className="form-select"
                  name="book"
                  value={formData.book}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select Book</option>

                  {books.map((book) => (

                    <option
                      key={book.id}
                      value={book.id}
                    >
                      {book.title}
                    </option>

                  ))}

                </select>

              </div>

              <div className="mb-3">

                <label>Member</label>

                <select
                  className="form-select"
                  name="member"
                  value={formData.member}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select Member</option>

                  {members.map((member) => (

                    <option
                      key={member.id}
                      value={member.id}
                    >
                      {member.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="mb-3">

                <label>Due Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="mb-3">

                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="ISSUED">
                    ISSUED
                  </option>

                  <option value="RETURNED">
                    RETURNED
                  </option>

                  <option value="OVERDUE">
                    OVERDUE
                  </option>

                </select>

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                className="btn btn-primary"
                type="submit"
              >
                {isEditing
                  ? "Update Borrowing"
                  : "Issue Book"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  </MainLayout>
);
}