export default function RepairsTable() {

  const repairs = [
    {
      id: 1,
      vehicle: "BMW Serie 3",
      client: "Juan García",
      status: "En proceso",
      price: "420€",
    },
    {
      id: 2,
      vehicle: "Audi A4",
      client: "Carlos López",
      status: "Esperando piezas",
      price: "780€",
    },
    {
      id: 3,
      vehicle: "Seat León",
      client: "Marta Ruiz",
      status: "Finalizado",
      price: "210€",
    },
  ];
  return (
    <div className="px-8 pb-8">

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Reparaciones en curso
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b text-left">
              <th className="pb-4">Vehículo</th>
              <th className="pb-4">Cliente</th>
              <th className="pb-4">Estado</th>
              <th className="pb-4">Precio</th>
            </tr>
          </thead>

          <tbody>

            {repairs.map((repair) => (

              <tr key={repair.id} className="border-b">

                <td className="py-4">{repair.vehicle}</td>

                <td>{repair.client}</td>

                <td>{repair.status}</td>

                <td>{repair.price}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}