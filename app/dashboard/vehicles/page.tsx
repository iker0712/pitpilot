"use client";

import { useEffect, useState } from "react";
import VehiclesTable from "@/components/dashboard/VehiclesTable";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: number;
  name: string;
};

type Vehicle = {
  id: number;
  plate: string;
  brand: string;
  model: string;
  client: string;
  client_id: number | null;
  status: string;
};

export default function VehiclesPage() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [clientId, setClientId] = useState("");
  const [search, setSearch] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const vehiclesResult = await supabase
        .from("vehicles")
        .select("*")
        .order("id", { ascending: false });

      const clientsResult = await supabase
        .from("clients")
        .select("id, name")
        .order("name", { ascending: true });

      if (vehiclesResult.error) {
        console.error(
          "Error cargando vehículos:",
          vehiclesResult.error
        );
      } else {
        setVehicles(vehiclesResult.data || []);
      }

      if (clientsResult.error) {
        console.error(
          "Error cargando clientes:",
          clientsResult.error
        );
      } else {
        setClients(clientsResult.data || []);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const resetForm = () => {
    setPlate("");
    setBrand("");
    setModel("");
    setClientId("");
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!plate || !brand || !model || !clientId) {
      alert("Completa todos los campos");
      return;
    }

    const selectedClient = clients.find(
      (client) => client.id === Number(clientId)
    );

    if (!selectedClient) {
      alert("Selecciona un cliente");
      return;
    }

    // =========================
    // EDITAR
    // =========================

    if (editingId !== null) {
      console.log("EDITANDO VEHÍCULO ID:", editingId);

      const updateData = {
        plate: plate,
        brand: brand,
        model: model,
        client: selectedClient.name,
        client_id: Number(clientId),
      };

      const { error } = await supabase
        .from("vehicles")
        .update(updateData)
        .eq("id", editingId);

      if (error) {
        console.error(
          "ERROR REAL AL EDITAR:",
          error
        );

        alert(
          "No se ha podido editar el vehículo. Mira la consola."
        );

        return;
      }

      setVehicles((current) =>
        current.map((vehicle) =>
          vehicle.id === editingId
            ? {
                ...vehicle,
                ...updateData,
              }
            : vehicle
        )
      );

      alert("Vehículo actualizado correctamente");

      resetForm();
      setOpen(false);

      return;
    }

    // =========================
    // CREAR
    // =========================

    const newVehicle = {
      plate: plate,
      brand: brand,
      model: model,
      client: selectedClient.name,
      client_id: Number(clientId),
      status: "En reparación",
    };

    const { data, error } = await supabase
      .from("vehicles")
      .insert(newVehicle)
      .select("*")
      .single();

    if (error) {
      console.error(
        "Error guardando vehículo:",
        error
      );

      alert(
        "No se ha podido guardar el vehículo"
      );

      return;
    }

    setVehicles((current) => [
      data,
      ...current,
    ]);

    resetForm();
    setOpen(false);
  };

  const handleEdit = (vehicle: Vehicle) => {
    console.log(
      "ABRIENDO EDICIÓN:",
      vehicle
    );

    setEditingId(vehicle.id);
    setPlate(vehicle.plate);
    setBrand(vehicle.brand);
    setModel(vehicle.model);

    if (vehicle.client_id !== null) {
      setClientId(
        String(vehicle.client_id)
      );
    } else {
      const client = clients.find(
        (item) =>
          item.name === vehicle.client
      );

      setClientId(
        client
          ? String(client.id)
          : ""
      );
    }

    setOpen(true);
  };

  const handleDelete = async (
    id: number
  ) => {
    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando vehículo:",
        error
      );

      alert(
        "No se ha podido eliminar el vehículo"
      );

      return;
    }

    setVehicles((current) =>
      current.filter(
        (vehicle) =>
          vehicle.id !== id
      )
    );
  };

  const filteredVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.plate
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        vehicle.client
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        vehicle.brand
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        vehicle.model
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Vehículos
        </h1>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Nuevo vehículo
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Buscar por matrícula, cliente, marca o modelo..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl p-3 mb-6"
      />

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          Cargando vehículos...
        </div>
      ) : (
        <VehiclesTable
          vehicles={filteredVehicles}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">

            <h2 className="text-3xl font-bold mb-6">
              {editingId !== null
                ? "Editar vehículo"
                : "Nuevo vehículo"}
            </h2>

            <input
              value={plate}
              onChange={(e) =>
                setPlate(e.target.value)
              }
              placeholder="Matrícula"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={brand}
              onChange={(e) =>
                setBrand(e.target.value)
              }
              placeholder="Marca"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={model}
              onChange={(e) =>
                setModel(e.target.value)
              }
              placeholder="Modelo"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <select
              value={clientId}
              onChange={(e) =>
                setClientId(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-6"
            >
              <option value="">
                Seleccionar cliente
              </option>

              {clients.map((client) => (
                <option
                  key={client.id}
                  value={client.id}
                >
                  {client.name}
                </option>
              ))}
            </select>

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