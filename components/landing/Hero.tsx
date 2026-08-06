export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 items-center gap-20">

      <div>

        <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
          Software para talleres
        </span>

        <h1 className="mt-6 text-6xl font-extrabold leading-tight">
          Gestiona tu taller con ayuda de IA.
        </h1>

        <p className="mt-8 text-xl text-slate-600 leading-9">
          Presupuestos, clientes y reparaciones en una sola plataforma
          diseñada para talleres mecánicos.
        </p>

        <div className="mt-10 flex gap-4">

          <button className="rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition">
            Solicitar demo
          </button>

          <button className="rounded-xl border px-8 py-4 font-semibold hover:bg-slate-100 transition">
            Ver funciones
          </button>

        </div>

      </div>

      <div className="rounded-3xl bg-slate-900 p-8 shadow-2xl">

        <div className="rounded-2xl bg-white p-8">

          <h2 className="text-2xl font-bold">
            Panel del taller
          </h2>

          <div className="mt-8 space-y-4">

            <div className="rounded-xl bg-slate-100 p-4">
              🚗 Reparación BMW Serie 3
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              📅 4 citas para hoy
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              💰 Facturación semanal +18%
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
