"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Usuario registrado correctamente");
      router.push("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1>Registrarse</h1>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register}>Crear cuenta</button>
      </div>
    </div>
  );
};

export default RegisterPage;