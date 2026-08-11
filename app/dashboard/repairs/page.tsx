"use client";

import { useEffect, useState } from "react";
import RepairsTable from "@/components/dashboard/RepairsTable";
import { createClient } from "@/lib/supabase/client";

type Vehicle = {
  id: number;
  plate: string;
  brand: string;
  model: string;
  client: string;
};

type Repair = {
  id: number;
  vehicle: string;
  client: string;
  mechanic: string;
  status: string;
  price: number;
  vehicle_id: number | null;
};

export default function RepairsPage() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [vehicleId, setVehicleId] = useState("");
  const [mechanic, setMechanic] = useState("");
  const [status, setStatus] = useState("En proceso");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [repairsResult, vehiclesResult] =
        await Promise.all([
          supabase
            .from("repairs")
            .select("*")
            .order("id", { ascending: false }),

          supabase
            .from("vehicles")
            .select("id, plate, brand, model, client")
            .order("plate", { ascending: true }),
        ]);

      if (repairsResult.error) {
        console.error(
          "Error cargando reparaciones:",
          repairsResult.error
        );
      } else {
        setRepairs(repairsResult.data || []);
      }

      if (vehiclesResult.error) {
        console.error(
          "Error cargando vehículos:",
          vehiclesResult.error
        );
      } else {
        setVehicles(vehiclesResult.data || []);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const resetForm = () => {
    setVehicleId("");
    setMechanic("");
    setStatus("En proceso");
    setPrice("");
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!vehicleId || !mechanic || !price) {
      alert("Completa todos los campos");
      return;
    }

    const selectedVehicle = vehicles.find(
      (vehicle) =>
        vehicle.id === Number(vehicleId)
    );

    if (!selectedVehicle) {
      alert("Selecciona un vehículo");
      return;
    }

    const vehicleName = `${selectedVehicle.brand} ${selectedVehicle.model} (${selectedVehicle.plate})`;

    const repairData = {
      vehicle: vehicleName,
      client: selectedVehicle.client,
      mechanic,
      status,
      price: Number(price),
      vehicle_id: Number(vehicleId),
    };

    // EDITAR
    if (editingId !== null) {
      const { data, error } = await supabase
        .from("repairs")
        .update(repairData)
        .eq("id", editingId)
        .select("*")
        .single();

      if (error) {
        console.error(
          "Error editando reparación:",
          error
        );

        alert(
          "No se ha podido editar la reparación"
        );

        return;
      }

      setRepairs((current) =>
        current.map((repair) =>
          repair.id === editingId
            ? data
            : repair
        )
      );

      alert(
        "Reparación actualizada correctamente"
      );

      resetForm();
      setOpen(false);

      return;
    }

    // CREAR
    const { data, error } = await supabase
      .from("repairs")
      .insert([repairData])
      .select("*")
      .single();

    if (error) {
      console.error(
        "Error guardando reparación:",
        error
      );

      alert(
        "No se ha podido guardar la reparación"
      );

      return;
    }

    setRepairs((current) => [
      data,
      ...current,
    ]);

    resetForm();
    setOpen(false);
  };

  const handleEdit = (repair: Repair) => {
    setEditingId(repair.id);

    setVehicleId(
      repair.vehicle_id
        ? String(repair.vehicle_id)
        : ""
    );

    setMechanic(repair.mechanic);
    setStatus(repair.status);
    setPrice(String(repair.price));

    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar esta reparación?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("repairs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando reparación:",
        error
      );

      alert(
        "No se ha podido eliminar la reparación"
      );

      return;
    }

    setRepairs((current) =>
      current.filter(
        (repair) => repair.id !== id
      )
    );
  };

  const filteredRepairs = repairs.filter(
    (repair) =>
      repair.vehicle
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      repair.client
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      repair.mechanic
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      repair.status
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Reparaciones
        </h1>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Nueva reparación
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Buscar reparación..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl p-3 mb-6"
      />

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          Cargando reparaciones...
        </div>
      ) : (
        <RepairsTable
          repairs={filteredRepairs}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">

            <h2 className="text-3xl font-bold mb-6">
              {editingId !== null
                ? "Editar reparación"
                : "Nueva reparación"}
            </h2>

            <select
              value={vehicleId}
              onChange={(e) =>
                setVehicleId(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-4"
            >
              <option value="">
                Seleccionar vehículo
              </option>

              {vehicles.map((vehicle) => (
                <option
                  key={vehicle.id}
                  value={vehicle.id}
                >
                  {vehicle.brand}{" "}
                  {vehicle.model} —{" "}
                  {vehicle.plate} —{" "}
                  {vehicle.client}
                </option>
              ))}
            </select>

            <input
              value={mechanic}
              onChange={(e) =>
                setMechanic(e.target.value)
              }
              placeholder="Mecánico"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-4"
            >
              <option value="En proceso">
                En proceso
              </option>

              <option value="Esperando piezas">
                Esperando piezas
              </option>

              <option value="Finalizado">
                Finalizado
              </option>
            </select>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              placeholder="Precio (€)"
              className="w-full border rounded-xl p-3 mb-6"
            />

            <div className="flex justify-end gap-4">

              <button
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
                className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                {editingId !== null
                  ? "Guardar cambios"
                  : "Guardar"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}