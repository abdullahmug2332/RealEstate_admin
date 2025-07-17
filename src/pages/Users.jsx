import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseURL } from "../../API/baseURL";


export default function Users() {
    const toggle = useSelector((state) => state.toggle.value);
    const loggedInUserId = localStorage.getItem("id");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");

    // Fetch all users
    const fetchUsers = () => {
        axios
            .get(`${baseURL}/users`)
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error fetching users:", err));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Create new user
    const handleCreate = (e) => {
        e.preventDefault();
        setMessage("");

        const { name, email, password } = formData;

        if (!name || !email || !password) {
            return setMessage("Please fill in all fields");
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

        axios
            .post(`${baseURL}/users`, formData)
            .then((res) => {
                alert("User created successfully")
                setMessage(res.data.message); // shows "User created successfully"
                setFormData({ name: "", email: "", password: "" });
                fetchUsers();
            })
            .catch((err) => {
                const errorMessage = err.response?.data?.message || "Failed to create user";
                alert(errorMessage);
                setMessage(errorMessage);
                console.error("Error creating user:", err);
            });
    };


    // Delete user
    const handleDelete = (id) => {
        if (id == loggedInUserId) {
            alert("❌ You can delete this ID because you are currently loggedIn with this ID");
            return
        }
        if (id === 1) {
            alert("❌ You can never delete the owner of Abdullah Real Estate.");
            return;
        }
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        axios
            .delete(`${baseURL}/users/${id}`)
            .then((res) => {
                setMessage(res.data.message);
                fetchUsers();
            })
            .catch((err) => {
                console.error("Error deleting user:", err);
                setMessage("Failed to delete user");
            });
    };

    return (
        <div className={`${toggle === false
            ? "w-full"
            : "md:w-[80%] lg:w-[82%] xl:w-[85%] 2xl:w-[87%]"} duration-500 font-semibold ml-auto py-[20px] px-[30px] mt-[40px] p-6`}>
            <h2 className="text-[30px] md:text-[40px]font-bold mb-4 mt-[20px]">Create User</h2>

            {message && (
                <p className="mb-3 text-sm color font-semibold">{message}</p>
            )}

            <form onSubmit={handleCreate} className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="col-span-full bg-[#1e1e1f] text-white py-2 rounded"
                >
                    Create User
                </button>
            </form>

            <h2 className="text-xl font-semibold mb-3">All Users</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Password</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id}>
                                    <td className="p-2 border text-center">{user.id}</td>
                                    <td className="p-2 border text-center">{user.name}</td>
                                    <td className="p-2 border text-center">{user.email}</td>
                                    <td className="p-2 border text-center">{user.password}</td>
                                    <td className="p-2 border text-center">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800 font-semibold"
                                        >
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
