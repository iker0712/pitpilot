type Vehicle = {
  id: number;
  plate: string;
  brand: string;
  model: string;
  client: string;
  status: string;
};

export default function VehiclesTable({
  vehicles,
  onDelete,
}: {
  vehicles: Vehicle[];
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full table-auto">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Matrícula</th>
            <th className="text-left p-4">Marca</th>
            <th className="text-left p-4">Modelo</th>
            <th className="text-left p-4">Cliente</th>
            <th className="text-left p-4">Estado</th>
            <th className="text-center p-4">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="border-t hover:bg-slate-50 transition">
              <td className="p-4">{vehicle.plate}</td>
              <td className="p-4">{vehicle.brand}</td>
              <td className="p-4">{vehicle.model}</td>
              <td className="p-4">{vehicle.client}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${vehicle.status === "Finalizado"
                      ? "bg-green-100 text-green-700"
                      : vehicle.status === "En reparación"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {vehicle.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex gap-2 justify-center">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg">
                    Editar
                  </button>

                  <button
                    onClick={() => onDelete(vehicle.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}