"use client";

import { useEffect, useState } from "react";
import ClientsTable from "@/components/dashboard/ClientsTable";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

type Vehicle = {
  id: number;
  plate: string;
  brand: string;
  model: string;
  client: string;
  client_id: number | null;
};

type Repair = {
  id: number;
  vehicle: string;
  mechanic: string;
  status: string;
  price: number;
  vehicle_id: number | null;
};

type Appointment = {
  id: number;
  vehicle: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  vehicle_id: number | null;
};

export default function ClientsPage() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const [clients, setClients] =
    useState<Client[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FICHA DEL CLIENTE
  const [selectedClient, setSelectedClient] =
    useState<Client | null>(null);

  const [clientVehicles, setClientVehicles] =
    useState<Vehicle[]>([]);

  const [clientRepairs, setClientRepairs] =
    useState<Repair[]>([]);

  const [clientAppointments, setClientAppointments] =
    useState<Appointment[]>([]);

  const [loadingProfile, setLoadingProfile] =
    useState(false);

  // CARGAR CLIENTES
  useEffect(() => {
    const loadClients = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("id", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Error cargando clientes:",
          error
        );
      } else {
        setClients(data || []);
      }

      setLoading(false);
    };

    loadClients();
  }, []);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setEditingId(null);
  };

  // GUARDAR / EDITAR
  const handleSave = async () => {
    if (!name || !phone || !email) {
      alert("Completa todos los campos");
      return;
    }

    // EDITAR
    if (editingId !== null) {
      const updateData = {
        name,
        phone,
        email,
      };

      const { error } = await supabase
        .from("clients")
        .update(updateData)
        .eq("id", editingId);

      if (error) {
        console.error(
          "Error editando cliente:",
          error
        );

        alert(
          "No se ha podido editar el cliente"
        );

        return;
      }

      setClients((current) =>
        current.map((client) =>
          client.id === editingId
            ? {
                ...client,
                ...updateData,
              }
            : client
        )
      );

      alert(
        "Cliente actualizado correctamente"
      );

      resetForm();
      setOpen(false);

      return;
    }

    // CREAR
    const { data, error } = await supabase
      .from("clients")
      .insert({
        name,
        phone,
        email,
      })
      .select("*")
      .single();

    if (error) {
      console.error(
        "Error guardando cliente:",
        error
      );

      alert(
        "No se ha podido guardar el cliente"
      );

      return;
    }

    setClients((current) => [
      data,
      ...current,
    ]);

    resetForm();
    setOpen(false);
  };

  // EDITAR
  const handleEdit = (client: Client) => {
    setEditingId(client.id);

    setName(client.name);
    setPhone(client.phone);
    setEmail(client.email);

    setOpen(true);
  };

  // ELIMINAR
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar este cliente?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando cliente:",
        error
      );

      alert(
        "No se ha podido eliminar el cliente"
      );

      return;
    }

    setClients((current) =>
      current.filter(
        (client) => client.id !== id
      )
    );
  };

  // VER FICHA
  const handleView = async (
    client: Client
  ) => {
    setSelectedClient(client);
    setLoadingProfile(true);

    const vehiclesResult =
      await supabase
        .from("vehicles")
        .select(
          "id, plate, brand, model, client, client_id"
        )
        .eq("client_id", client.id)
        .order("id", {
          ascending: false,
        });

    if (vehiclesResult.error) {
      console.error(
        "Error cargando vehículos del cliente:",
        vehiclesResult.error
      );
    }

    const vehicleIds =
      (vehiclesResult.data || []).map(
        (vehicle) => vehicle.id
      );

    let repairs: Repair[] = [];
    let appointments: Appointment[] = [];

    if (vehicleIds.length > 0) {
      const repairsResult =
        await supabase
          .from("repairs")
          .select(
            "id, vehicle, mechanic, status, price, vehicle_id"
          )
          .in("vehicle_id", vehicleIds)
          .order("id", {
            ascending: false,
          });

      if (repairsResult.error) {
        console.error(
          "Error cargando reparaciones del cliente:",
          repairsResult.error
        );
      } else {
        repairs =
          repairsResult.data || [];
      }

      const appointmentsResult =
        await supabase
          .from("appointments")
          .select(
            "id, vehicle, date, time, reason, status, vehicle_id"
          )
          .in("vehicle_id", vehicleIds)
          .order("date", {
            ascending: true,
          });

      if (appointmentsResult.error) {
        console.error(
          "Error cargando citas del cliente:",
          appointmentsResult.error
        );
      } else {
        appointments =
          appointmentsResult.data || [];
      }
    }

    setClientVehicles(
      vehiclesResult.data || []
    );

    setClientRepairs(repairs);
    setClientAppointments(
      appointments
    );

    setLoadingProfile(false);
  };

  // BUSCAR
  const filteredClients =
    clients.filter(
      (client) =>
        client.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        client.phone
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        client.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <div>

      {/* CABECERA */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Clientes
        </h1>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Nuevo cliente
        </button>

      </div>

      {/* BUSCADOR */}

      <input
        type="text"
        placeholder="🔍 Buscar cliente..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl p-3 mb-6"
      />

      {/* TABLA */}

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          Cargando clientes...
        </div>
      ) : (
        <ClientsTable
          clients={filteredClients}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
        />
      )}

      {/* MODAL CREAR / EDITAR */}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">

            <h2 className="text-3xl font-bold mb-6">
              {editingId !== null
                ? "Editar cliente"
                : "Nuevo cliente"}
            </h2>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Nombre completo"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Teléfono"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Email"
              type="email"
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

      {/* FICHA DEL CLIENTE */}

      {selectedClient && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

            {/* CABECERA FICHA */}

            <div className="p-8 border-b flex justify-between items-start">

              <div>

                <h2 className="text-3xl font-bold">
                  {selectedClient.name}
                </h2>

                <div className="mt-3 text-slate-600 space-y-1">

                  <p>
                    📞 {selectedClient.phone}
                  </p>

                  <p>
                    ✉️ {selectedClient.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedClient(null)
                }
                className="text-slate-500 hover:text-slate-900 text-2xl"
              >
                ✕
              </button>

            </div>

            {loadingProfile ? (
              <div className="p-12 text-center text-slate-500">
                Cargando ficha del cliente...
              </div>
            ) : (
              <div className="p-8 space-y-8">

                {/* VEHÍCULOS */}

                <section>

                  <h3 className="text-xl font-bold mb-4">
                    🚗 Vehículos
                  </h3>

                  {clientVehicles.length === 0 ? (
                    <div className="bg-slate-50 rounded-xl p-5 text-slate-500">
                      Este cliente no tiene vehículos registrados.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {clientVehicles.map(
                        (vehicle) => (
                          <div
                            key={vehicle.id}
                            className="border rounded-xl p-5"
                          >

                            <p className="font-bold text-lg">
                              {vehicle.brand}{" "}
                              {vehicle.model}
                            </p>

                            <p className="text-slate-500">
                              Matrícula:{" "}
                              {vehicle.plate}
                            </p>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </section>

                {/* REPARACIONES */}

                <section>

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-xl font-bold">
                      🔧 Historial de reparaciones
                    </h3>

                    <p className="font-bold">
                      {clientRepairs.reduce(
                        (total, repair) =>
                          total +
                          Number(
                            repair.price || 0
                          ),
                        0
                      ).toFixed(2)}
                      €
                    </p>

                  </div>

                  {clientRepairs.length === 0 ? (
                    <div className="bg-slate-50 rounded-xl p-5 text-slate-500">
                      No hay reparaciones registradas.
                    </div>
                  ) : (
                    <div className="space-y-3">

                      {clientRepairs.map(
                        (repair) => (
                          <div
                            key={repair.id}
                            className="border rounded-xl p-4 flex justify-between items-center"
                          >

                            <div>

                              <p className="font-semibold">
                                {repair.vehicle}
                              </p>

                              <p className="text-sm text-slate-500">
                                Mecánico:{" "}
                                {repair.mechanic}
                              </p>

                            </div>

                            <div className="text-right">

                              <p className="font-bold">
                                {Number(
                                  repair.price || 0
                                ).toFixed(2)}
                                €
                              </p>

                              <span
                                className={`text-sm ${
                                  repair.status ===
                                  "Finalizado"
                                    ? "text-green-600"
                                    : repair.status ===
                                      "Esperando piezas"
                                    ? "text-red-600"
                                    : "text-yellow-600"
                                }`}
                              >
                                {repair.status}
                              </span>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </section>

                {/* CITAS */}

                <section>

                  <h3 className="text-xl font-bold mb-4">
                    📅 Citas
                  </h3>

                  {clientAppointments.length === 0 ? (
                    <div className="bg-slate-50 rounded-xl p-5 text-slate-500">
                      No hay citas registradas.
                    </div>
                  ) : (
                    <div className="space-y-3">

                      {clientAppointments.map(
                        (appointment) => (
                          <div
                            key={appointment.id}
                            className="border rounded-xl p-4 flex justify-between items-center"
                          >

                            <div>

                              <p className="font-semibold">
                                {appointment.vehicle}
                              </p>

                              <p className="text-sm text-slate-500">
                                {appointment.reason}
                              </p>

                            </div>

                            <div className="text-right">

                              <p className="font-semibold">
                                {appointment.date}
                              </p>

                              <p className="text-blue-600">
                                {appointment.time.slice(
                                  0,
                                  5
                                )}
                              </p>

                              <p className="text-sm text-slate-500">
                                {appointment.status}
                              </p>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </section>

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}