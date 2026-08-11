type Repair = {
  id: number;
  vehicle: string;
  client: string;
  mechanic: string;
  status: string;
  price: number;
  vehicle_id: number | null;
};

export default function RepairsTable({
  repairs,
  onDelete,
  onEdit,
}: {
  repairs: Repair[];
  onDelete?: (id: number) => void;
  onEdit?: (repair: Repair) => void;
}) {
  const showActions = !!onDelete || !!onEdit;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Vehículo</th>
            <th className="text-left p-4">Cliente</th>
            <th className="text-left p-4">Mecánico</th>
            <th className="text-left p-4">Estado</th>
            <th className="text-left p-4">Precio</th>

            {showActions && (
              <th className="text-left p-4">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {repairs.map((repair) => (
            <tr
              key={repair.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4">
                {repair.vehicle}
              </td>

              <td className="p-4">
                {repair.client}
              </td>

              <td className="p-4">
                {repair.mechanic}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    repair.status === "Finalizado"
                      ? "bg-green-100 text-green-700"
                      : repair.status === "En proceso"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {repair.status}
                </span>
              </td>

              <td className="p-4">
                {repair.price}€
              </td>

              {showActions && (
                <td className="p-4">
                  <div className="flex gap-2">

                    {onDelete && (
                      <button
                        onClick={() =>
                          onDelete(repair.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Eliminar
                      </button>
                    )}

                    {onEdit && (
                      <button
                        onClick={() =>
                          onEdit(repair)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                      >
                        Editar
                      </button>
                    )}

                  </div>
                </td>
              )}

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}