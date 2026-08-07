type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  vehicles: number;
};

export default function ClientsTable({
  clients,
}: {
  clients: Client[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full table-auto">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left p-4">Nombre</th>
            <th className="text-left p-4">Teléfono</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Vehículos</th>
            <th className="text-center p-4">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-t hover:bg-slate-50 transition"
            >
              <td className="p-4">{client.name}</td>
              <td className="p-4">{client.phone}</td>
              <td className="p-4">{client.email}</td>
              <td className="p-4">{client.vehicles}</td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg">
                    Editar
                  </button>

                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
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