import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch All Users
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/users/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post("/users", form);
    }

    setForm({ name: "", email: "", age: "" });
    fetchUsers();
  };

  // Edit User
  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user._id);
  };

  // Delete User
  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">User CRUD (React + Node + MongoDB)</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="form-control"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          {editingId ? "Update User" : "Add User"}
        </button>
      </form>

      {/* USERS TABLE */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.age}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(u)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Home;
