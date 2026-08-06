export default function DashboardPreview() {
  return (
    <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-8">

         <h2 className="text-4xl font-bold text-center">
           Así se ve PitPilot
         </h2>

         <p className="text-center text-slate-600 mt-4">
           Todo el taller organizado en una única pantalla.
         </p>
         <div className="mt-16 rounded-3xl bg-slate-900 p-8 shadow-2xl">
           <div className="rounded-2xl bg-white p-8">
              <h3 className="text-2xl font-bold">
                Dashboard
              </h3>
              <p className="text-slate-500 mt-2">
                Miércoles, 5 de agosto
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                <div className="rounded-xl bg-slate-100 p-5">
                  <p className="text-slate-500 text-sm">Vehículos hoy</p>
                  <h2 className="text-3xl font-bold mt-2">12</h2>
                </div>

                <div className="rounded-xl bg-slate-100 p-5">
                  <p className="text-slate-500 text-sm">Citas</p>
                  <h2 className="text-3xl font-bold mt-2">5</h2>
                </div>

                <div className="rounded-xl bg-slate-100 p-5">
                  <p className="text-slate-500 text-sm">Facturación</p>
                  <h2 className="text-3xl font-bold mt-2">3.250€</h2>
                </div>

                <div className="rounded-xl bg-slate-100 p-5">
                  <p className="text-slate-500 text-sm">Clientes</p>
                  <h2 className="text-3xl font-bold mt-2">148</h2>
                </div>

              </div> 
           
            </div>

          </div>

        </div>

      </section>
  );
}