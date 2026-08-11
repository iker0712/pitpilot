"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Invoice = {
  id: number;
  client: string;
  vehicle: string;
  repair_id: number;
  date: string;
  subtotal: number;
  iva: number;
  total: number;
  status: string;
};

type Repair = {
  id: number;
  vehicle: string;
  client: string;
  price: number;
};

export default function InvoicesPage() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [repairId, setRepairId] = useState("");
  const [date, setDate] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [status, setStatus] = useState("Pendiente");
  const [search, setSearch] = useState("");

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [loading, setLoading] = useState(true);

  const iva = subtotal
    ? Number(subtotal) * 0.21
    : 0;

  const total = subtotal
    ? Number(subtotal) + iva
    : 0;

  useEffect(() => {
    const loadData = async () => {
      const [invoicesResult, repairsResult] =
        await Promise.all([
          supabase
            .from("invoices")
            .select("*")
            .order("id", { ascending: false }),

          supabase
            .from("repairs")
            .select("id, vehicle, client, price")
            .order("id", { ascending: false }),
        ]);

      if (invoicesResult.error) {
        console.error(
          "Error cargando facturas:",
          invoicesResult.error
        );
      } else {
        setInvoices(invoicesResult.data || []);
      }

      if (repairsResult.error) {
        console.error(
          "Error cargando reparaciones:",
          repairsResult.error
        );
      } else {
        setRepairs(repairsResult.data || []);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const resetForm = () => {
    setRepairId("");
    setDate(
      new Date().toISOString().split("T")[0]
    );
    setSubtotal("");
    setStatus("Pendiente");
    setEditingId(null);
  };

  const handleRepairChange = (
    value: string
  ) => {
    setRepairId(value);

    const selectedRepair = repairs.find(
      (repair) =>
        repair.id === Number(value)
    );

    if (selectedRepair) {
      setSubtotal(
        String(selectedRepair.price)
      );
    }
  };

  const handleSave = async () => {
    if (!repairId || !date || !subtotal) {
      alert("Completa todos los campos");
      return;
    }

    const selectedRepair = repairs.find(
      (repair) =>
        repair.id === Number(repairId)
    );

    if (!selectedRepair) {
      alert("Selecciona una reparación");
      return;
    }

    const invoiceData = {
      client: selectedRepair.client,
      vehicle: selectedRepair.vehicle,
      repair_id: Number(repairId),
      date,
      subtotal: Number(subtotal),
      iva,
      total,
      status,
    };

    // EDITAR FACTURA
    if (editingId !== null) {
      const { data, error } = await supabase
        .from("invoices")
        .update(invoiceData)
        .eq("id", editingId)
        .select("*")
        .single();

      if (error) {
        console.error(
          "Error editando factura:",
          error
        );

        alert(
          "No se ha podido editar la factura"
        );

        return;
      }

      setInvoices((current) =>
        current.map((invoice) =>
          invoice.id === editingId
            ? data
            : invoice
        )
      );

      alert(
        "Factura actualizada correctamente"
      );

      resetForm();
      setOpen(false);

      return;
    }

    // CREAR FACTURA
    const { data, error } = await supabase
      .from("invoices")
      .insert([invoiceData])
      .select("*")
      .single();

    if (error) {
      console.error(
        "Error guardando factura:",
        error
      );

      alert(
        "No se ha podido guardar la factura"
      );

      return;
    }

    setInvoices((current) => [
      data,
      ...current,
    ]);

    resetForm();
    setOpen(false);
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingId(invoice.id);
    setRepairId(String(invoice.repair_id));
    setDate(invoice.date);
    setSubtotal(String(invoice.subtotal));
    setStatus(invoice.status);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar esta factura?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando factura:",
        error
      );

      alert(
        "No se ha podido eliminar la factura"
      );

      return;
    }

    setInvoices((current) =>
      current.filter(
        (invoice) => invoice.id !== id
      )
    );
  };

  const filteredInvoices =
    invoices.filter(
      (invoice) =>
        invoice.client
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        invoice.vehicle
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        invoice.status
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Facturación
        </h1>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Nueva factura
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Buscar factura..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl p-3 mb-6"
      />

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          Cargando facturas...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="text-left p-4">
                  Cliente
                </th>

                <th className="text-left p-4">
                  Vehículo
                </th>

                <th className="text-left p-4">
                  Fecha
                </th>

                <th className="text-left p-4">
                  Subtotal
                </th>

                <th className="text-left p-4">
                  IVA
                </th>

                <th className="text-left p-4">
                  Total
                </th>

                <th className="text-left p-4">
                  Estado
                </th>

                <th className="text-left p-4">
                  Acciones
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredInvoices.map(
                (invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="p-4">
                      {invoice.client}
                    </td>

                    <td className="p-4">
                      {invoice.vehicle}
                    </td>

                    <td className="p-4">
                      {invoice.date}
                    </td>

                    <td className="p-4">
                      {Number(
                        invoice.subtotal
                      ).toFixed(2)}€
                    </td>

                    <td className="p-4">
                      {Number(
                        invoice.iva
                      ).toFixed(2)}€
                    </td>

                    <td className="p-4 font-semibold">
                      {Number(
                        invoice.total
                      ).toFixed(2)}€
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          invoice.status ===
                          "Pagada"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {invoice.status}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleEdit(invoice)
                          }
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              invoice.id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                        >
                          Eliminar
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {filteredInvoices.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No hay facturas registradas.
            </div>
          )}

        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">

            <h2 className="text-3xl font-bold mb-6">
              {editingId !== null
                ? "Editar factura"
                : "Nueva factura"}
            </h2>

            <select
              value={repairId}
              onChange={(e) =>
                handleRepairChange(
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 mb-4"
            >
              <option value="">
                Seleccionar reparación
              </option>

              {repairs.map((repair) => (
                <option
                  key={repair.id}
                  value={repair.id}
                >
                  {repair.client} —{" "}
                  {repair.vehicle} —{" "}
                  {repair.price}€
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              type="number"
              value={subtotal}
              onChange={(e) =>
                setSubtotal(e.target.value)
              }
              placeholder="Subtotal (€)"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <div className="bg-slate-50 rounded-xl p-4 mb-6">

              <div className="flex justify-between mb-2">
                <span>IVA (21%)</span>

                <span>
                  {iva.toFixed(2)}€
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>

                <span>
                  {total.toFixed(2)}€
                </span>
              </div>

            </div>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full border rounded-xl p-3 mb-6"
            >
              <option value="Pendiente">
                Pendiente
              </option>

              <option value="Pagada">
                Pagada
              </option>
            </select>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => {
                  resetForm();
                  setOpen(false);
                }}
                className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                {editingId !== null
                  ? "Guardar cambios"
                  : "Guardar"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}