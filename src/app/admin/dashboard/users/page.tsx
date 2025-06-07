"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}
const token = localStorage.getItem("token");


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Kullanıcılar getirilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setUsers(users.filter((user) => user._id !== id));
        alert("Kullanıcı başarıyla silindi.");
      } else {
        const errorData = await res.json();
        console.error("Silme hatası:", errorData);
        alert(
          `Kullanıcı silinemedi: ${errorData.message || "Bilinmeyen hata"}`
        );
      }
    } catch (error) {
      console.error("Silme işlemi başarısız:", error);
      alert("Silme işlemi sırasında bir hata oluştu.");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Kullanıcılar</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-2 border">{user._id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
