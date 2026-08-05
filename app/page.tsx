export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-blue-600">
          PitPilot
        </h1>

        <div className="hidden md:flex gap-8 font-medium text-slate-700">
          <a href="#">Inicio</a>
          <a href="#">Funciones</a>
          <a href="#">Contacto</a>
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition">
          Solicitar demo
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 items-center gap-20">

        {/* Texto */}
        <div>

          <span className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
            Software para talleres
          </span>

          <h1 className="mt-6 text-6xl font-extrabold leading-tight">
            Gestiona tu taller con ayuda de IA.
          </h1>

          <p className="mt-8 text-xl text-slate-600 leading-9">
            Presupuestos, clientes, reparaciones y organización
            en una sola plataforma diseñada para talleres mecánicos.
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

        {/* Caja simulando la aplicación */}

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

      {/* Beneficios */}

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
      {/* Cómo funciona */}

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
      {/* Dashboard */}

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

      <section className="py-24 bg-slate-900 text-white">

        <div className="max-w-4xl mx-auto text-center px-8">

         <h2 className="text-5xl font-bold">
           ¿Listo para modernizar tu taller?
         </h2>

         <p className="text-xl text-slate-300 mt-6">
           Descubre cómo PitPilot puede ayudarte a ahorrar tiempo, aumentar beneficios y gestionar todo desde un único lugar.
         </p>

         <button className="mt-10 bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl text-lg font-semibold transition">
           Solicitar una demo gratuita
         </button>

        </div>

      </section>

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
      

    </main>
  );
}
