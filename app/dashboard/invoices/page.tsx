export default function InvoicesPage() {
  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Facturas
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
          + Nueva factura
        </button>

      </div>

      <div className="bg-white rounded-2xl shadow p-10 text-center">

        <h2 className="text-2xl font-bold mb-2">
          Próximamente
        </h2>

        <p className="text-slate-500">
          Aquí podrás generar y gestionar todas las facturas del taller.
        </p>

      </div>

    </div>
  );
}