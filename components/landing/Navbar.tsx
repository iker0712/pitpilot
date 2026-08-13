export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-blue-600">
        PitPilot
      </h1>

      <div className="hidden md:flex gap-8 font-medium text-slate-700">
        <a href="#">Inicio</a>
        <a href="#">Funciones</a>
        <a href="#">Contacto</a>
      </div>

      <a
        href="/demo"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
      >
        Solicitar demo
      </a>
    </nav>
  );
}
