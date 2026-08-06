"use client";

import { useState } from "react";
import VehiclesTable from "@/components/dashboard/VehiclesTable";

export default function VehiclesPage() {
  const [open, setOpen] = useState(false);

  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [client, setClient] = useState("");

  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: "1234 ABC",
      brand: "BMW",
      model: "Serie 3",
      client: "Juan García",
      status: "En reparación",
    },
    {
      id: 2,
      plate: "5678 DEF",
      brand: "Audi",
      model: "A4",
      client: "Carlos López",
      status: "Finalizado",
    },
  ]);

  const handleSave = () => {
    if (!plate || !brand || !model || !client) return;

    const newVehicle = {
      id: Date.now(),
      plate,
      brand,
      model,
      client,
      status: "En reparación",
    };

    setVehicles([...vehicles, newVehicle]);

    setPlate("");
    setBrand("");
    setModel("");
    setClient("");

    setOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Vehículos</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Nuevo vehículo
        </button>
      </div>

      <VehiclesTable vehicles={vehicles} />

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">
            <h2 className="text-3xl font-bold mb-6">
              Nuevo vehículo
            </h2>

            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="Matrícula"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Marca"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Modelo"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Cliente"
              className="w-full border rounded-xl p-3 mb-6"
            />

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}