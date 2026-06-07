"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userName", res.data.user.name);

      router.push("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1>Iniciar sesión</h1>

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

        <button onClick={login}>Entrar</button>
        <p style={{ textAlign: "center", marginTop: "12px" }}>
          ¿No tienes cuenta?{" "}
          <span
              style={{ color: "#2563eb", cursor: "pointer" }}
              onClick={() => router.push("/register")}
            >
              Regístrate
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;