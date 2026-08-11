"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Vehicle = {
  id: number;
  plate: string;
  brand: string;
  model: string;
  client: string;
};

type Appointment = {
  id: number;
  client: string;
  vehicle: string;
  vehicle_id: number | null;
  date: string;
  time: string;
  reason: string;
  status: string;
};

export default function AppointmentsPage() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [vehicleId, setVehicleId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pendiente");
  const [search, setSearch] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // CARGAR DATOS
  useEffect(() => {
    const loadData = async () => {
      const appointmentsResult = await supabase
        .from("appointments")
        .select("*")
        .order("date", { ascending: true });

      const vehiclesResult = await supabase
        .from("vehicles")
        .select("id, plate, brand, model, client")
        .order("plate", { ascending: true });

      if (appointmentsResult.error) {
        console.error(
          "Error cargando citas:",
          appointmentsResult.error
        );
      } else {
        setAppointments(
          appointmentsResult.data || []
        );
      }

      if (vehiclesResult.error) {
        console.error(
          "Error cargando vehículos:",
          vehiclesResult.error
        );
      } else {
        setVehicles(
          vehiclesResult.data || []
        );
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // RESET FORMULARIO
  const resetForm = () => {
    setVehicleId("");
    setDate("");
    setTime("");
    setReason("");
    setStatus("Pendiente");
    setEditingId(null);
  };

  // GUARDAR / EDITAR
  const handleSave = async () => {
    if (!vehicleId || !date || !time || !reason) {
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

    const appointmentData = {
      client: selectedVehicle.client,
      vehicle: vehicleName,
      vehicle_id: Number(vehicleId),
      date,
      time,
      reason,
      status,
    };

    // EDITAR
    if (editingId !== null) {
      const { error } = await supabase
        .from("appointments")
        .update(appointmentData)
        .eq("id", editingId);

      if (error) {
        console.error(
          "Error editando cita:",
          error
        );

        alert(
          "No se ha podido editar la cita"
        );

        return;
      }

      setAppointments((current) =>
        current.map((appointment) =>
          appointment.id === editingId
            ? {
                ...appointment,
                ...appointmentData,
              }
            : appointment
        )
      );

      alert("Cita actualizada correctamente");

      resetForm();
      setOpen(false);

      return;
    }

    // CREAR
    const { data, error } = await supabase
      .from("appointments")
      .insert(appointmentData)
      .select("*")
      .single();

    if (error) {
      console.error(
        "Error guardando cita:",
        error
      );

      alert(
        "No se ha podido guardar la cita"
      );

      return;
    }

    setAppointments((current) => [
      ...current,
      data,
    ]);

    resetForm();
    setOpen(false);
  };

  // EDITAR
  const handleEdit = (
    appointment: Appointment
  ) => {
    setEditingId(appointment.id);

    setVehicleId(
      appointment.vehicle_id
        ? String(appointment.vehicle_id)
        : ""
    );

    setDate(appointment.date);
    setTime(appointment.time);
    setReason(appointment.reason);
    setStatus(
      appointment.status || "Pendiente"
    );

    setOpen(true);
  };

  // ELIMINAR
  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar esta cita?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando cita:",
        error
      );

      alert(
        "No se ha podido eliminar la cita"
      );

      return;
    }

    setAppointments((current) =>
      current.filter(
        (appointment) =>
          appointment.id !== id
      )
    );
  };

  // BUSCAR
  const filteredAppointments =
    appointments.filter(
      (appointment) =>
        appointment.client
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.vehicle
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.reason
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        appointment.status
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Citas
        </h1>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Nueva cita
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Buscar cita..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl p-3 mb-6"
      />

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          Cargando citas...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">
              <tr>

                <th className="text-left p-4">
                  Fecha
                </th>

                <th className="text-left p-4">
                  Hora
                </th>

                <th className="text-left p-4">
                  Cliente
                </th>

                <th className="text-left p-4">
                  Vehículo
                </th>

                <th className="text-left p-4">
                  Motivo
                </th>

                <th className="text-left p-4">
                  Estado
                </th>

                <th className="text-center p-4">
                  Acciones
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredAppointments.map(
                (appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {appointment.date}
                    </td>

                    <td className="p-4">
                      {appointment.time}
                    </td>

                    <td className="p-4">
                      {appointment.client}
                    </td>

                    <td className="p-4">
                      {appointment.vehicle}
                    </td>

                    <td className="p-4">
                      {appointment.reason}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          appointment.status ===
                          "Completada"
                            ? "bg-green-100 text-green-700"
                            : appointment.status ===
                              "Cancelada"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            handleEdit(
                              appointment
                            )
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              appointment.id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                        >
                          Eliminar
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

      {/* MODAL */}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">

            <h2 className="text-3xl font-bold mb-6">
              {editingId !== null
                ? "Editar cita"
                : "Nueva cita"}
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
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              type="time"
              value={time}
              onChange={(e) =>
                setTime(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              placeholder="Motivo de la cita"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-6"
            >
              <option value="Pendiente">
                Pendiente
              </option>

              <option value="Completada">
                Completada
              </option>

              <option value="Cancelada">
                Cancelada
              </option>
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