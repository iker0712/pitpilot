"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DemoPage() {
  const supabase = createClient();

  const [workshopName, setWorkshopName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("demo_requests")
      .insert({
        workshop_name: workshopName,
        name,
        email,
        phone,
        message,
      });

    if (error) {
      console.error(
        "Error enviando solicitud:",
        error
      );

      alert(
        "No se ha podido enviar la solicitud. Inténtalo de nuevo."
      );

      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">

      <div className="w-full max-w-2xl">

        {/* CABECERA */}

        <div className="text-center mb-10">

          <div className="text-blue-600 font-bold text-2xl mb-4">
            PitPilot
          </div>

          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Solicita una demo
          </h1>

          <p className="text-slate-600 text-lg">
            Cuéntanos un poco sobre tu taller y te enseñaremos
            cómo PitPilot puede ayudarte a gestionarlo.
          </p>

        </div>

        {/* FORMULARIO */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          {submitted ? (

            <div className="text-center py-10">

              <div className="text-5xl mb-6">
                ✓
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                ¡Solicitud recibida!
              </h2>

              <p className="text-slate-600">
                Gracias por tu interés en PitPilot.
                Nos pondremos en contacto contigo próximamente.
              </p>

              <a
                href="/"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Volver a PitPilot
              </a>

            </div>

          ) : (

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* TALLER */}

              <div>

                <label className="block font-semibold mb-2">
                  Nombre del taller
                </label>

                <input
                  type="text"
                  required
                  value={workshopName}
                  onChange={(e) =>
                    setWorkshopName(e.target.value)
                  }
                  placeholder="Ej. Taller García"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* NOMBRE */}

              <div>

                <label className="block font-semibold mb-2">
                  Tu nombre
                </label>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Ej. Iker"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="ejemplo@taller.com"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* TELÉFONO */}

              <div>

                <label className="block font-semibold mb-2">
                  Teléfono
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="600 000 000"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* MENSAJE */}

              <div>

                <label className="block font-semibold mb-2">
                  ¿Qué necesitas?
                </label>

                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Cuéntanos brevemente qué buscas para tu taller..."
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

              {/* BOTÓN */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold text-lg transition"
              >
                {loading
                  ? "Enviando..."
                  : "Solicitar demo"}
              </button>

            </form>

          )}

        </div>

        {/* VOLVER */}

        {!submitted && (
          <div className="text-center mt-6">

            <a
              href="/"
              className="text-slate-500 hover:text-blue-600"
            >
              ← Volver a PitPilot
            </a>

          </div>
        )}

      </div>

    </main>
  );
}