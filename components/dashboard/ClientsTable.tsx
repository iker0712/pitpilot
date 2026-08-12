"use client";

type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export default function ClientsTable({
  clients,
  onDelete,
  onEdit,
  onView,
}: {
  clients: Client[];
  onDelete: (id: number) => void;
  onEdit: (client: Client) => void;
  onView: (client: Client) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr>

            <th className="text-left p-4">
              Nombre
            </th>

            <th className="text-left p-4">
              Teléfono
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-center p-4">
              Acciones
            </th>

          </tr>
        </thead>

        <tbody>
          {clients.map((client) => (
            <tr
              key={client.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-4 font-medium">
                {client.name}
              </td>

              <td className="p-4">
                {client.phone}
              </td>

              <td className="p-4">
                {client.email}
              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() =>
                      onView(client)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                  >
                    Ver ficha
                  </button>

                  <button
                    onClick={() =>
                      onEdit(client)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() =>
                      onDelete(client.id)
                    }
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