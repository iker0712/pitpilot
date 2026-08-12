"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function StatsCards() {
  const supabase = createClient();

  const [vehicles, setVehicles] = useState(0);
  const [clients, setClients] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [billing, setBilling] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      // VEHÍCULOS
      const vehiclesResult = await supabase
        .from("vehicles")
        .select("*", {
          count: "exact",
          head: true,
        });

      // CLIENTES
      const clientsResult = await supabase
        .from("clients")
        .select("*", {
          count: "exact",
          head: true,
        });

      // FECHA DE HOY
      const today = new Date()
        .toISOString()
        .split("T")[0];

      // CITAS DE HOY
      const appointmentsResult = await supabase
        .from("appointments")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("date", today);

      // FACTURACIÓN
      const repairsResult = await supabase
        .from("repairs")
        .select("price");

      if (repairsResult.error) {
        console.error(
          "Error cargando facturación:",
          repairsResult.error
        );
      } else {
        const totalBilling =
          (repairsResult.data || []).reduce(
            (total, repair) =>
              total + Number(repair.price || 0),
            0
          );

        setBilling(totalBilling);
      }

      setVehicles(vehiclesResult.count || 0);
      setClients(clientsResult.count || 0);
      setAppointments(
        appointmentsResult.count || 0
      );
    };

    loadStats();
  }, []);

  const stats = [
    {
      title: "Vehículos activos",
      value: vehicles,
    },
    {
      title: "Clientes",
      value: clients,
    },
    {
      title: "Facturación",
      value: `${billing.toFixed(2)}€`,
    },
    {
      title: "Citas hoy",
      value: appointments,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <p className="text-slate-500">
            {stat.title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stat.value}
          </h2>
        </div>
      ))}

    </div>
  );
}