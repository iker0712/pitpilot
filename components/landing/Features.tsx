export default function Features() {
  return (
      <section className="max-w-7xl mx-auto px-8 py-24">

       <h2 className="text-4xl font-bold text-center">
         Todo lo que necesita un taller
       </h2>

       <p className="text-center text-slate-600 mt-4">
         Diseñado para ahorrar tiempo y aumentar la rentabilidad.
       </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

         <div className="rounded-2xl border p-8 shadow-sm hover:shadow-lg transition">
           <div className="text-4xl">📋</div>

           <h3 className="mt-6 text-2xl font-bold">
             Presupuestos rápidos
           </h3>

           <p className="mt-4 text-slate-600">
             Crea presupuestos profesionales en segundos.
           </p>
         </div>

         <div className="rounded-2xl border p-8 shadow-sm hover:shadow-lg transition">
           <div className="text-4xl">🤖</div>

           <h3 className="mt-6 text-2xl font-bold">
             IA integrada
           </h3>

           <p className="mt-4 text-slate-600">
             Obtén ayuda para diagnósticos y organización.
           </p>
         </div>

         <div className="rounded-2xl border p-8 shadow-sm hover:shadow-lg transition">
           <div className="text-4xl">📈</div>

           <h3 className="mt-6 text-2xl font-bold">
             Más beneficios
           </h3>

           <p className="mt-4 text-slate-600">
             Controla clientes, ingresos y productividad.
           </p>
         </div>

        </div>

      </section>
    );
}