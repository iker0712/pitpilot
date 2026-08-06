export default function Benefits() {
  return (
    <section className="py-24 bg-slate-50">

        <div className="max-w-6xl mx-auto px-8 text-center">

         <h2 className="text-4xl font-bold">
           ¿Por qué elegir PitPilot?
         </h2>

         <p className="text-slate-600 mt-4">
           Ahorra tiempo, aumenta beneficios y ofrece un mejor servicio.
         </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

           <div className="bg-white rounded-2xl p-8 shadow-lg">
             <h3 className="text-5xl font-bold text-blue-600">70%</h3>
             <p className="mt-3 text-slate-600">
               Menos tiempo preparando presupuestos.
             </p>
           </div>

           <div className="bg-white rounded-2xl p-8 shadow-lg">
             <h3 className="text-5xl font-bold text-blue-600">+30%</h3>
             <p className="mt-3 text-slate-600">
               Más productividad del taller.
             </p>
           </div>

           <div className="bg-white rounded-2xl p-8 shadow-lg">
             <h3 className="text-5xl font-bold text-blue-600">24/7</h3>
             <p className="mt-3 text-slate-600">
               Toda la información siempre disponible.
             </p>
           </div>

          </div>

        </div>

      </section>
  );
}