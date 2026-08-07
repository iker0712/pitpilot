"use client";

import { useState } from "react";
import ClientsTable from "@/components/dashboard/ClientsTable";

export default function ClientsPage() {
  const [clients] = useState([
    {
      id: 1,
      name: "Juan García",
      phone: "612345678",
      email: "juan@gmail.com",
      vehicles: 2,
    },
    {
      id: 2,
      name: "Carlos López",
      phone: "645987321",
      email: "carlos@gmail.com",
      vehicles: 1,
    },
    {
      id: 3,
      name: "Marta Ruiz",
      phone: "699123456",
      email: "marta@gmail.com",
      vehicles: 3,
    },
  ]);

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Clientes
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
          + Nuevo cliente
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Buscar cliente..."
        className="w-full border rounded-xl p-3 mb-6"
      />

      <ClientsTable clients={clients} />

    </div>
  );
}