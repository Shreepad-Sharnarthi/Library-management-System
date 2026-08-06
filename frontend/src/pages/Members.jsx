import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import * as bootstrap from "bootstrap";

export default function Members() {
  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "ACTIVE",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const res = await api.get("members/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(res.data.results || res.data);
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

  const handleEdit = (member) => {
    setIsEditing(true);
    setEditingId(member.id);

    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      status: member.status,
    });

    const modal = new bootstrap.Modal(
      document.getElementById("memberModal")
    );

    modal.show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("access_token");

      if (isEditing) {
        await api.put(`members/${editingId}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Member Updated Successfully!");
      } else {
        await api.post("members/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Member Added Successfully!");
      }

      loadMembers();

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        status: "ACTIVE",
      });

      setEditingId(null);
      setIsEditing(false);

      bootstrap.Modal.getInstance(
        document.getElementById("memberModal")
      )?.hide();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      const token = localStorage.getItem("access_token");

      await api.delete(`members/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Member Deleted Successfully!");

      loadMembers();
    } catch (err) {
      console.log(err);
      alert("Unable to delete member.");
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase()) ||
    member.email.toLowerCase().includes(search.toLowerCase()) ||
    member.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
       <h2 className="fw-bold text-primary">
    👥 Members Management
</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#memberModal"
        >
          + Add Member
        </button>
      </div>

      <div className="card">
        <div className="card-body">

          <input
            className="form-control mb-4"
            placeholder="🔍 Search Member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th width="170">Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredMembers.map((member) => (

                  <tr key={member.id}>

                    <td>{member.name}</td>

                    <td>{member.email}</td>

                    <td>{member.phone}</td>

                    <td>

                      <span
                        className={`badge ${
                          member.status === "ACTIVE"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {member.status}
                      </span>

                    </td>

                    <td>{member.membership_date}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(member)}
                      >
                        Edit
                      </button>

                      {isAdmin && (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(member.id)}
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
        id="memberModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">

          <div className="modal-content">

            <form onSubmit={handleSubmit}>

              <div className="modal-header">

                <h5 className="modal-title">
                  {isEditing ? "Edit Member" : "Add Member"}
                </h5>

                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>

              </div>

              <div className="modal-body">

                <input
                  className="form-control mb-3"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  className="form-control mb-3"
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <textarea
                  className="form-control mb-3"
                  placeholder="Address"
                  rows="3"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  type="button"
                >
                  Cancel
                </button>

                <button className="btn btn-primary">
                  {isEditing ? "Update Member" : "Save Member"}
                </button>

              </div>

            </form>

          </div>

        </div>
      </div>

    </MainLayout>
  );
}