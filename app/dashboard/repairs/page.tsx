"use client";

import { useState } from "react";
import RepairsTable from "@/components/dashboard/RepairsTable";

export default function RepairsPage() {
  const [repairs] = useState([
    {
      id: 1,
      vehicle: "BMW Serie 3",
      client: "Juan García",
      mechanic: "Pedro",
      status: "En proceso",
      price: "420€",
    },
    {
      id: 2,
      vehicle: "Audi A4",
      client: "Carlos López",
      mechanic: "Luis",
      status: "Esperando piezas",
      price: "780€",
    },
    {
      id: 3,
      vehicle: "Seat León",
      client: "Marta Ruiz",
      mechanic: "David",
      status: "Finalizado",
      price: "210€",
    },
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Reparaciones
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
          + Nueva reparación
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar reparación..."
        className="w-full border rounded-xl p-3 mb-6"
      />

      <RepairsTable repairs={repairs} />
    </div>
  );
}