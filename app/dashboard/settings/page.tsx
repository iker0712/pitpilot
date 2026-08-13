"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [workshopName, setWorkshopName] = useState("Mi taller");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    alert("Configuración guardada correctamente");
  };

  return (
    <div>
      {/* TÍTULO */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Configuración
        </h1>

        <p className="text-slate-500 mt-2">
          Configura los datos de tu taller
        </p>
      </div>

      {/* DATOS DEL TALLER */}
      <div className="bg-white rounded-2xl shadow p-8 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">
          Datos del taller
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block font-semibold mb-2">
              Nombre del taller
            </label>

            <input
              type="text"
              value={workshopName}
              onChange={(e) =>
                setWorkshopName(e.target.value)
              }
              placeholder="Nombre del taller"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Teléfono
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Teléfono del taller"
              className="w-full border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Email del taller"
              className="w-full border rounded-xl p-3"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Guardar cambios
          </button>
        </div>
      </div>

      {/* INFORMACIÓN */}
      <div className="bg-white rounded-2xl shadow p-8 max-w-3xl mt-6">
        <h2 className="text-2xl font-bold mb-3">
          PitPilot
        </h2>

        <p className="text-slate-500">
          Gestión inteligente para talleres.
        </p>

        <p className="text-slate-400 text-sm mt-4">
          Versión 1.0
        </p>
      </div>
    </div>
  );
}