"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function WorkshopSummary() {
  const supabase = createClient();

  const [inProgress, setInProgress] = useState(0);
  const [waitingParts, setWaitingParts] = useState(0);
  const [finished, setFinished] = useState(0);

  useEffect(() => {
    const loadSummary = async () => {
      const { data, error } = await supabase
        .from("repairs")
        .select("status");

      if (error) {
        console.error(
          "Error cargando estado del taller:",
          error
        );
        return;
      }

      const repairs = data || [];

      setInProgress(
        repairs.filter(
          (repair) =>
            repair.status === "En proceso"
        ).length
      );

      setWaitingParts(
        repairs.filter(
          (repair) =>
            repair.status ===
            "Esperando piezas"
        ).length
      );

      setFinished(
        repairs.filter(
          (repair) =>
            repair.status === "Finalizado"
        ).length
      );
    };

    loadSummary();
  }, []);

  const stats = [
    {
      title: "En proceso",
      value: inProgress,
      description: "Vehículos en reparación",
      className:
        "bg-yellow-50 border-yellow-200",
    },
    {
      title: "Esperando piezas",
      value: waitingParts,
      description: "Pendientes de piezas",
      className:
        "bg-red-50 border-red-200",
    },
    {
      title: "Finalizadas",
      value: finished,
      description: "Reparaciones terminadas",
      className:
        "bg-green-50 border-green-200",
    },
  ];

  return (
    <div className="mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Estado del taller
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`rounded-2xl border p-6 ${stat.className}`}
          >

            <p className="text-slate-600 font-medium">
              {stat.title}
            </p>

            <p className="text-4xl font-bold mt-2">
              {stat.value}
            </p>

            <p className="text-sm text-slate-500 mt-2">
              {stat.description}
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}