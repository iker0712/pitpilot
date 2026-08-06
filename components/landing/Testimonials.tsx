export default function Testimonials() {
  return (
    <section className="py-24 bg-white">

        <div className="max-w-6xl mx-auto px-8">

         <h2 className="text-4xl font-bold text-center">
           Lo que opinan los talleres
         </h2>

         <p className="text-center text-slate-600 mt-4">
           Diseñado para hacer el trabajo más fácil.
         </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

           <div className="bg-slate-100 rounded-2xl p-8">
             ⭐⭐⭐⭐⭐
             <p className="mt-4">
               "Ahora hacemos presupuestos en minutos. Hemos ahorrado muchísimo tiempo."
             </p>

             <h4 className="font-bold mt-6">
               Taller García
             </h4>
           </div>

           <div className="bg-slate-100 rounded-2xl p-8">
             ⭐⭐⭐⭐⭐
             <p className="mt-4">
               "Toda la información está organizada y es muy fácil encontrar cualquier reparación."
             </p>

             <h4 className="font-bold mt-6">
               AutoService Norte
             </h4>
           </div>
         

           <div className="bg-slate-100 rounded-2xl p-8">
             ⭐⭐⭐⭐⭐
             <p className="mt-4">
               "La IA nos ayuda muchísimo con los diagnósticos."
             </p>

             <h4 className="font-bold mt-6">
               Taller Martínez
             </h4>

            </div>

          </div>

        </div>

      </section>
  );
}