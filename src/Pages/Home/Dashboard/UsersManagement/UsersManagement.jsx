import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };

    Swal.fire({
      title: "Promote to Admin?",
      text: `Are you sure you wanna upgrade ${user.displayName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yeah, go ahead ✨",
      cancelButtonText: "Nah, cancel ❌",
      reverseButtons: true,
      background: "#1e1e1e",
      color: "#fff",
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#ef4444",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user.displayName} is now an Admin 🛡️`,
              showConfirmButton: false,
              timer: 1800,
              background: "#111",
              color: "#fff",
              customClass: {
                popup: "rounded-2xl shadow-xl backdrop-blur-lg",
              },
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };

    Swal.fire({
      title: "Remove Admin Privileges?",
      text: `Do you really wanna downgrade ${user.displayName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove 🔻",
      cancelButtonText: "Cancel ❌",
      reverseButtons: true,
      background: "#1e1e1e",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#10B981",
      customClass: {
        popup: "rounded-2xl shadow-2xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user.displayName} is no longer Admin 👋`,
              showConfirmButton: false,
              timer: 1800,
              background: "#111",
              color: "#fff",
              customClass: {
                popup: "rounded-2xl shadow-xl backdrop-blur-lg",
              },
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl">Manage Users : {users.length}</h2>

      {/* Search Field */}
      <div className="mb-6">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          placeholder="Search users..."
          className="w-full md:w-1/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Other Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn"
                    >
                      <FiShieldOff></FiShieldOff>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn"
                    >
                      <FaUserShield></FaUserShield>
                    </button>
                  )}
                </td>
                <td>Admin</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Actions</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
