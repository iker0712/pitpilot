"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function WorkshopSummary() {
  const supabase = createClient();

  const [inProgress, setInProgress] = useState(0);
  const [finished, setFinished] = useState(0);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    const loadSummary = async () => {
      // REPARACIONES EN PROCESO
      const inProgressResult = await supabase
        .from("repairs")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "En proceso");

      // REPARACIONES FINALIZADAS
      const finishedResult = await supabase
        .from("repairs")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "Finalizado");

      // FACTURAS PENDIENTES
      const pendingResult = await supabase
        .from("invoices")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("status", "Pendiente");

      // INGRESOS DEL MES
      const now = new Date();

      const firstDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
        .toISOString()
        .split("T")[0];

      const lastDay = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      )
        .toISOString()
        .split("T")[0];

      const incomeResult = await supabase
        .from("invoices")
        .select("total")
        .eq("status", "Pagada")
        .gte("date", firstDay)
        .lte("date", lastDay);

      const income =
        incomeResult.data?.reduce(
          (sum, invoice) =>
            sum + Number(invoice.total || 0),
          0
        ) || 0;

      setInProgress(
        inProgressResult.count || 0
      );

      setFinished(
        finishedResult.count || 0
      );

      setPendingInvoices(
        pendingResult.count || 0
      );

      setMonthlyIncome(income);
    };

    loadSummary();
  }, []);

  const stats = [
    {
      title: "Reparaciones en proceso",
      value: inProgress,
      color: "text-yellow-600",
    },
    {
      title: "Reparaciones finalizadas",
      value: finished,
      color: "text-green-600",
    },
    {
      title: "Facturas pendientes",
      value: pendingInvoices,
      color: "text-red-600",
    },
    {
      title: "Ingresos del mes",
      value: `${monthlyIncome.toFixed(2)}€`,
      color: "text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-2xl p-6 shadow"
        >
          <p className="text-slate-500">
            {stat.title}
          </p>

          <h2
            className={`text-3xl font-bold mt-2 ${stat.color}`}
          >
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}