export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-16">

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10">

         <div>
           <h2 className="text-3xl font-bold text-blue-500">
             PitPilot
           </h2>

           <p className="text-slate-400 mt-4">
             El copiloto inteligente para talleres mecánicos.
           </p>
          </div>

          <div>
           <h3 className="font-bold mb-4">
              Enlaces
           </h3>

           <ul className="space-y-2 text-slate-400">
             <li>Inicio</li>
             <li>Funciones</li>
             <li>Contacto</li>
           </ul>
         </div>

         <div>
           <h3 className="font-bold mb-4">
             Contacto
           </h3>

           <p className="text-slate-400">
             info@pitpilot.es
           </p>

           <p className="text-slate-400 mt-2">
             © 2026 PitPilot
           </p>

          </div>

        </div>

    </footer>
  );
}