"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Appointment = {
  id: number;
  client: string;
  vehicle: string;
  date: string;
  time: string;
  reason: string;
  status: string;
};

export default function UpcomingAppointments() {
  const supabase = createClient();

  const [appointments, setAppointments] = useState<
    Appointment[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      const { data, error } = await supabase
        .from("appointments")
        .select(
          "id, client, vehicle, date, time, reason, status"
        )
        .gte("date", today)
        .neq("status", "Cancelada")
        .order("date", { ascending: true })
        .order("time", { ascending: true })
        .limit(5);

      if (error) {
        console.error(
          "Error cargando próximas citas:",
          error
        );
      } else {
        setAppointments(data || []);
      }

      setLoading(false);
    };

    loadAppointments();
  }, []);

  return (
    <div className="mt-8 bg-white rounded-2xl shadow overflow-hidden">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">
          Próximas citas
        </h2>

        <p className="text-slate-500 mt-1">
          Las próximas citas programadas
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">
          Cargando citas...
        </div>
      ) : appointments.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No hay próximas citas.
        </div>
      ) : (
        <div className="divide-y">

          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-5 flex items-center justify-between hover:bg-slate-50"
            >

              <div className="flex items-center gap-5">

                <div className="text-center min-w-[70px]">
                  <p className="text-sm text-slate-500">
                    {new Date(
                      `${appointment.date}T00:00:00`
                    ).toLocaleDateString("es-ES", {
                      weekday: "short",
                    })}
                  </p>

                  <p className="text-xl font-bold">
                    {new Date(
                      `${appointment.date}T00:00:00`
                    ).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </p>

                  <p className="text-blue-600 font-semibold">
                    {appointment.time.slice(0, 5)}
                  </p>
                </div>

                <div>
                  <p className="font-bold">
                    {appointment.vehicle}
                  </p>

                  <p className="text-slate-600">
                    {appointment.client}
                  </p>

                  <p className="text-sm text-slate-500">
                    {appointment.reason}
                  </p>
                </div>

              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  appointment.status === "Completada"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {appointment.status}
              </span>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}