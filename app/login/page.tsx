"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error iniciando sesión:", error);
      setError("Email o contraseña incorrectos");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold">
            PitPilot
          </h1>

          <p className="text-slate-500 mt-2">
            Gestión inteligente para tu taller
          </p>

        </div>

        <h2 className="text-2xl font-bold mb-6">
          Iniciar sesión
        </h2>

        <div className="mb-4">

          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="mb-4">

          <label className="block text-sm font-medium mb-2">
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

        </div>

        {error && (
          <div className="bg-red-50 text-red-600 rounded-xl p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Iniciando sesión..."
            : "Iniciar sesión"}
        </button>

      </div>

    </div>
  );
}