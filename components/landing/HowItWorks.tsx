export default function HowItWorks() {
  return (
      <section className="bg-slate-50 py-24">



        <div className="max-w-6xl mx-auto px-8">



          <h2 className="text-4xl font-bold text-center">

           ¿Cómo funciona?

         </h2>



         <p className="text-center text-slate-600 mt-4">

           Gestiona un vehículo desde que entra al taller hasta que se entrega.

         </p>



         <div className="grid md:grid-cols-3 gap-10 mt-16">



           <div className="text-center">

             <div className="text-6xl">🚗</div>



             <h3 className="mt-6 text-2xl font-bold">

               1. Recibe el vehículo

             </h3>



             <p className="mt-4 text-slate-600">

                Registra al cliente y crea la orden de trabajo en segundos.

             </p>



            </div>



            <div className="text-center">



             <div className="text-6xl">🛠️</div>



             <h3 className="mt-6 text-2xl font-bold">

               2. Gestiona la reparación

             </h3>



             <p className="mt-4 text-slate-600">

               Controla tareas, piezas y tiempos desde un único lugar.

             </p>



            </div>



            <div className="text-center">



             <div className="text-6xl">✅</div>



             <h3 className="mt-6 text-2xl font-bold">

               3. Entrega el coche

             </h3>



             <p className="mt-4 text-slate-600">

               Genera la factura y mantén todo el historial organizado.

             </p>



            </div>



          </div>



        </div>



      </section>
   );
}