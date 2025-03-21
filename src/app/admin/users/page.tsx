"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiUserLine,
  RiSearchLine,
  RiFilter3Line,
  RiAdminLine,
  RiUserAddLine,
  RiMailLine,
  RiCalendarLine,
  RiShieldLine,
} from "react-icons/ri";

interface User {
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "user";
  lastLogin: string;
  createdAt: string;
}

interface NewUser {
  email: string;
  displayName: string;
  role: "admin" | "user";
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    email: "",
    displayName: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Failed to add user");

      // Reset form and refresh users
      setNewUser({ email: "", displayName: "", role: "user" });
      setShowAddUser(false);
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }

  async function handleUpdateRole(uid: string, newRole: "admin" | "user") {
    try {
      const response = await fetch(`/api/users/${uid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error("Failed to update user role");

      // Update local state
      setUsers(
        users.map((user) =>
          user.uid === uid ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      (roleFilter === "all" || user.role === roleFilter) &&
      (user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
              <p className="text-gray-400">
                Manage user accounts and permissions
              </p>
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <RiUserAddLine className="w-5 h-5" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <RiFilter3Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "all" | "admin" | "user")
            }
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500"
          >
            <option value="all" className="bg-[#1a1a1a]">
              All Roles
            </option>
            <option value="admin" className="bg-[#1a1a1a]">
              Admins
            </option>
            <option value="user" className="bg-[#1a1a1a]">
              Users
            </option>
          </select>
        </div>
      </div>

      {/* Users List */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-gray-400 font-medium">
                    User
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Role
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Last Login
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Joined
                  </th>
                  <th className="text-left p-4 text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index}>
                          <td colSpan={5} className="p-4">
                            <div className="animate-pulse flex items-center gap-4">
                              <div className="w-10 h-10 bg-white/5 rounded-full"></div>
                              <div className="flex-1">
                                <div className="h-4 bg-white/5 rounded w-48 mb-2"></div>
                                <div className="h-3 bg-white/5 rounded w-32"></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                  : filteredUsers.map((user) => (
                      <motion.tr
                        key={user.uid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <RiUserLine className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {user.displayName}
                              </p>
                              <p className="text-gray-400 text-sm flex items-center gap-2">
                                <RiMailLine className="w-4 h-4" />
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
                              user.role === "admin"
                                ? "bg-purple-500/20 text-purple-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {user.role === "admin" ? (
                              <RiAdminLine className="w-4 h-4" />
                            ) : (
                              <RiUserLine className="w-4 h-4" />
                            )}
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-400 flex items-center gap-2">
                            <RiCalendarLine className="w-4 h-4" />
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-gray-400 flex items-center gap-2">
                            <RiCalendarLine className="w-4 h-4" />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              handleUpdateRole(
                                user.uid,
                                e.target.value as "admin" | "user"
                              )
                            }
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-white text-sm appearance-none focus:outline-none focus:border-blue-500"
                          >
                            <option value="user" className="bg-[#1a1a1a]">
                              User
                            </option>
                            <option value="admin" className="bg-[#1a1a1a]">
                              Admin
                            </option>
                          </select>
                        </td>
                      </motion.tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <RiUserAddLine className="w-5 h-5" />
              Add New User
            </h2>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Display Name</label>
                <input
                  type="text"
                  value={newUser.displayName}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter display name"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      role: e.target.value as "admin" | "user",
                    }))
                  }
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500"
                >
                  <option value="user" className="bg-[#1a1a1a]">
                    User
                  </option>
                  <option value="admin" className="bg-[#1a1a1a]">
                    Admin
                  </option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
