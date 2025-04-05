import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8697/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Ошибка загрузки профиля", error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Загрузка профиля...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Профиль пользователя</h2>
      <p className="mt-2"><strong>Email:</strong> {user.email}</p>
      <p className="mt-2"><strong>Роль:</strong> {user.role}</p>
    </div>
  );
};

export default ProfilePage;