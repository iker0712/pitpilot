import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-500">
        PitPilot
      </h1>

      <nav className="mt-12 space-y-4">

        <Link href="/dashboard" className="block hover:text-blue-400">
          📊 Dashboard
        </Link>

        <Link href="/dashboard/vehicles" className="block hover:text-blue-400">
          🚗 Vehículos
        </Link>

        <Link href="/dashboard/clients" className="block hover:text-blue-400">
          👥 Clientes
        </Link>

        <Link href="/dashboard/repairs" className="block hover:text-blue-400">
          🔧 Reparaciones
        </Link>

        <Link href="/dashboard/appointments" className="block hover:text-blue-400">
          📅 Citas
        </Link>

        <Link href="/dashboard/invoices" className="block hover:text-blue-400">
          🧾 Facturas
        </Link>

        <Link href="/dashboard/settings" className="block hover:text-blue-400">
          ⚙️ Ajustes
        </Link>

      </nav>
    </aside>
  );
}