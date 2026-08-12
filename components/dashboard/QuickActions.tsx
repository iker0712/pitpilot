"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Nueva reparación",
      description: "Registrar una reparación",
      path: "/dashboard/repairs",
    },
    {
      title: "Nueva cita",
      description: "Crear una cita",
      path: "/dashboard/appointments",
    },
    {
      title: "Nuevo cliente",
      description: "Añadir un cliente",
      path: "/dashboard/clients",
    },
    {
      title: "Nuevo vehículo",
      description: "Registrar un vehículo",
      path: "/dashboard/vehicles",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Acciones rápidas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => router.push(action.path)}
            className="bg-white rounded-2xl p-5 shadow text-left hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="font-bold text-lg">
              {action.title}
            </h3>

            <p className="text-slate-500 mt-1">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}