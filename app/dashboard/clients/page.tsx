"use client";

import { useEffect, useState } from "react";
import ClientsTable from "@/components/dashboard/ClientsTable";
import { createClient } from "@/lib/supabase/client";

type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export default function ClientsPage() {
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // CARGAR CLIENTES
  useEffect(() => {
    const loadClients = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error(
          "Error cargando clientes:",
          error
        );
      } else {
        setClients(data || []);
      }

      setLoading(false);
    };

    loadClients();
  }, []);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setEditingId(null);
  };

  // GUARDAR / EDITAR
  const handleSave = async () => {
    if (!name || !phone || !email) {
      alert("Completa todos los campos");
      return;
    }

    // EDITAR
    if (editingId !== null) {
      const updateData = {
        name,
        phone,
        email,
      };

      const { error } = await supabase
        .from("clients")
        .update(updateData)
        .eq("id", editingId);

      if (error) {
        console.error(
          "Error editando cliente:",
          error
        );

        alert(
          "No se ha podido editar el cliente"
        );

        return;
      }

      setClients((current) =>
        current.map((client) =>
          client.id === editingId
            ? {
                ...client,
                ...updateData,
              }
            : client
        )
      );

      alert(
        "Cliente actualizado correctamente"
      );

      resetForm();
      setOpen(false);

      return;
    }

    // CREAR
    const { data, error } = await supabase
      .from("clients")
      .insert({
        name,
        phone,
        email,
      })
      .select("*")
      .single();

    if (error) {
      console.error(
        "Error guardando cliente:",
        error
      );

      alert(
        "No se ha podido guardar el cliente"
      );

      return;
    }

    setClients((current) => [
      data,
      ...current,
    ]);

    resetForm();
    setOpen(false);
  };

  // ABRIR EDICIÓN
  const handleEdit = (client: Client) => {
    setEditingId(client.id);

    setName(client.name);
    setPhone(client.phone);
    setEmail(client.email);

    setOpen(true);
  };

  // ELIMINAR
  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Error eliminando cliente:",
        error
      );

      alert(
        "No se ha podido eliminar el cliente"
      );

      return;
    }

    setClients((current) =>
      current.filter(
        (client) => client.id !== id
      )
    );
  };

  // BUSCAR
  const filteredClients = clients.filter(
    (client) =>
      client.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      client.phone
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      client.email
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Clientes
        </h1>

        <button
          onClick={() => {
            resetForm();
            setOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Nuevo cliente
        </button>

      </div>

      <input
        type="text"
        placeholder="🔍 Buscar cliente..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-xl p-3 mb-6"
      />

      {loading ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          Cargando clientes...
        </div>
      ) : (
        <ClientsTable
          clients={filteredClients}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">

            <h2 className="text-3xl font-bold mb-6">
              {editingId !== null
                ? "Editar cliente"
                : "Nuevo cliente"}
            </h2>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Nombre completo"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              placeholder="Teléfono"
              className="w-full border rounded-xl p-3 mb-4"
            />

            <input
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Email"
              type="email"
              className="w-full border rounded-xl p-3 mb-6"
            />

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