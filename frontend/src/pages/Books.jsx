import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import * as bootstrap from "bootstrap";
export default function Books() {
  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
const [formData, setFormData] = useState({
  title: "",
  author: "",
  isbn: "",
  category: "Technology",
  quantity: 1,
  available_quantity: 1,
  shelf_location: "",
});
const [editingId, setEditingId] = useState(null);
const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    loadBooks();
  }, []);

const loadBooks = async () => {
  try {
    const token = localStorage.getItem("access_token");

    console.log("TOKEN:", token);

    const res = await api.get("books/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("STATUS:", res.status);
    console.log("DATA:", res.data);

    if (res.data.results) {
      setBooks(res.data.results);
    } else {
      setBooks(res.data);
    }

  } catch (err) {
    console.log("FULL ERROR:", err);

    if (err.response) {
      console.log("STATUS:", err.response.status);
      console.log("DATA:", err.response.data);
    } else {
      console.log(err.message);
    }
  }
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleEdit = (book) => {

  setIsEditing(true);

  setEditingId(book.id);

  setFormData({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    category: book.category,
    quantity: book.quantity,
    available_quantity: book.available_quantity,
    shelf_location: book.shelf_location,
  });

  const modal = new bootstrap.Modal(
    document.getElementById("bookModal")
  );

  modal.show();

};
const handleSubmit = async (e) => {

  e.preventDefault();

  const token = localStorage.getItem("access_token");

  try {

    if (isEditing) {

      await api.put(
        `books/${editingId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Updated Successfully!");

    } else {

      await api.post(
        "books/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Book Added Successfully!");

    }

    loadBooks();

    setIsEditing(false);

    setEditingId(null);

    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: "Technology",
      quantity: 1,
      available_quantity: 1,
      shelf_location: "",
    });

  } catch (err) {

    console.log(err);

    alert("Operation Failed");

  }

};
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.category.toLowerCase().includes(search.toLowerCase())
  );
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("access_token");

        await api.delete(`books/${id}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        alert("Book Deleted Successfully!");

        loadBooks();

    } catch (error) {

        console.log(error);

        alert("Unable to delete book.");

    }

};
console.log("BOOKS STATE:", books);
  return (
    
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">
    📚 Books Management
</h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#bookModal"
        >
          + Add Book
        </button>
      </div>

      <div className="card">
        <div className="card-body">

          <input
            type="text"
            className="form-control mb-4"
            placeholder="🔍 Search Books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Available</th>
                <th>Shelf</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.available_quantity}</td>
                  <td>{book.shelf_location}</td>

                  <td>
                    <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => handleEdit(book)}
>
  Edit
</button>

                    {isAdmin && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(book.id)}
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

      {/* Add Book Modal */}
      <div
        className="modal fade"
        id="bookModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5>
  {isEditing ? "Edit Book" : "Add New Book"}
</h5>

              <button
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">

              <form onSubmit={handleSubmit}>

  <div className="row">

    <div className="col-md-6 mb-3">
      <label>Title</label>
      <input
        className="form-control"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Author</label>
      <input
        className="form-control"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>ISBN</label>
      <input
        className="form-control"
        name="isbn"
        value={formData.isbn}
        onChange={handleChange}
        required
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Category</label>

      <select
        className="form-select"
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option>Technology</option>
        <option>Science</option>
        <option>History</option>
        <option>Biography</option>
        <option>Fiction</option>
      </select>

    </div>

    <div className="col-md-6 mb-3">
      <label>Quantity</label>
      <input
        type="number"
        className="form-control"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-6 mb-3">
      <label>Available Quantity</label>
      <input
        type="number"
        className="form-control"
        name="available_quantity"
        value={formData.available_quantity}
        onChange={handleChange}
      />
    </div>

    <div className="col-md-12 mb-3">
      <label>Shelf Location</label>
      <input
        className="form-control"
        name="shelf_location"
        value={formData.shelf_location}
        onChange={handleChange}
      />
    </div>

  </div>

  <button
    className="btn btn-primary w-100"
    type="submit"
  >
   {isEditing ? "Update Book" : "Save Book"}
  </button>

</form>

            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

