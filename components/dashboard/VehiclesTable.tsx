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
}: {
  vehicles: Vehicle[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Matrícula</th>
            <th className="text-left p-4">Marca</th>
            <th className="text-left p-4">Modelo</th>
            <th className="text-left p-4">Cliente</th>
            <th className="text-left p-4">Estado</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id} className="border-t">
              <td className="p-4">{vehicle.plate}</td>
              <td className="p-4">{vehicle.brand}</td>
              <td className="p-4">{vehicle.model}</td>
              <td className="p-4">{vehicle.client}</td>
              <td className="p-4">{vehicle.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}