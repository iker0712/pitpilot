"use client";

import { useEffect, useState } from "react";
import StatsCards from "@/components/dashboard/StatsCards";
import RepairsTable from "@/components/dashboard/RepairsTable";
import { createClient } from "@/lib/supabase/client";
import WorkshopSummary from "@/components/dashboard/WorkshopSummary";
import QuickActions from "@/components/dashboard/QuickActions";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";

type Repair = {
  id: number;
  vehicle: string;
  client: string;
  mechanic: string;
  status: string;
  price: number;
  vehicle_id: number | null;
};

export default function DashboardPage() {
  const supabase = createClient();

  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRepairs = async () => {
      const { data, error } = await supabase
        .from("repairs")
        .select(
          "id, vehicle, client, mechanic, status, price, vehicle_id"
        )
        .order("id", { ascending: false })
        .limit(5);

      if (error) {
        console.error(
          "Error cargando reparaciones:",
          error
        );
      } else {
        setRepairs(data || []);
      }

      setLoading(false);
    };

    loadRepairs();
  }, []);

  return (
    <div className="p-8">

      {/* TÍTULO */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Resumen del estado de tu taller
        </p>
      </div>

      {/* ESTADÍSTICAS */}
      <StatsCards />

      {/* RESUMEN + ACCIONES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <WorkshopSummary />

        <QuickActions />

      </div>

      {/* PRÓXIMAS CITAS */}
      <div className="mt-8">
        <UpcomingAppointments />
      </div>

      {/* ÚLTIMAS REPARACIONES */}
      <div className="bg-white rounded-2xl shadow overflow-hidden mt-8">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Últimas reparaciones
          </h2>

          <p className="text-slate-500 mt-1">
            Las últimas reparaciones registradas en el taller
          </p>

        </div>

        {loading ? (
          <div className="p-8 text-center">
            Cargando reparaciones...
          </div>
        ) : repairs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No hay reparaciones registradas todavía.
          </div>
        ) : (
          <RepairsTable
            repairs={repairs}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        )}

      </div>

    </div>
  );
}