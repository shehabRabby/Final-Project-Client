import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-4xl">Manage Users : {users.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.email}
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
