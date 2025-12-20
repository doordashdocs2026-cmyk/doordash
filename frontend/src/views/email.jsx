// src/views/EnviarCorreo.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Menu,
  BarChart3,
  Settings,
  X,
  Home,
  CheckCircle,
  AlertCircle, Mail
} from "lucide-react";
import img4 from "../assets/imges/na.png";

export default function EnviarCorreo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const apiUrlLocal = "http://localhost:4000"; // backend local

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSend = async (type) => {
    if (!formData.fullName || !formData.email) {
      setMessage({ type: "error", text: "Por favor completa todos los campos" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      let endpoint = "";
      let payload = {};

      if (type === "welcome") {
        endpoint = "/send-welcome";
        payload = { to: formData.email, fullName: formData.fullName };
      } else {
        endpoint = "/send-email";
        payload = {
          to: formData.email,
          subject: "Verificación de correo",
          fullName: formData.fullName,
          email: formData.email,
        };
      }

      const res = await fetch(`${apiUrlLocal}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setMessage({
          type: "success",
          text: `Correo de ${
            type === "welcome" ? "bienvenida" : "verificación"
          } enviado a ${formData.email}`,
        });
        setModalOpen(true); // Abrir modal de éxito
      } else throw new Error(data.error || "Error al enviar correo");
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "Error al enviar correo. Intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { icon: <Home />, label: "Home DoorDash", path: "/home" },
    { icon: <BarChart3 />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users />, label: "Clientes", path: "/clientes" },
    { icon: <Mail />, label: "Emails", path: "/emails" },
    { icon: <Settings />, label: "Configuración", path: "/config" },
  ];

  return (
    <div className="flex min-h-screen font-sans text-gray-800 bg-orange-50">
      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : 0 }}
        className="fixed md:static z-20 w-56 md:w-48 bg-gradient-to-b from-orange-600 via-orange-500 to-orange-400 shadow-lg p-4 flex flex-col rounded-r-2xl h-full md:h-auto"
      >
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <img
              src={img4}
              alt="Logo"
              className="w-12 h-12 md:w-48 md:h-28 object-contain"
            />
          </div>
          <X
            className="md:hidden cursor-pointer text-white"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <nav className="flex flex-col gap-2 md:gap-3">
          {menuItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.path}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 md:gap-3 text-white font-medium p-2 md:p-3 rounded-lg cursor-pointer hover:bg-white hover:text-orange-600 text-sm md:text-sm transition-all"
            >
              {item.icon} {item.label}
            </motion.a>
          ))}
        </nav>
      </motion.aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex justify-center p-3 md:p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-orange-600 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent"
            >
              Enviar Correo
            </motion.h1>
            <Menu
              className="md:hidden cursor-pointer text-orange-600"
              onClick={() => setSidebarOpen(true)}
            />
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100">
            <div className="mb-6">
              <input
                type="text"
                name="fullName"
                placeholder="Nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-4 mb-4 border border-gray-200 bg-gray-50 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400 shadow-sm transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 bg-gray-50 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400 shadow-sm transition"
              />
            </div>

            {message && (
              <div
                className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.type === "success" ? <CheckCircle /> : <AlertCircle />}
                <span>{message.text}</span>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => handleSend("verification")}
                disabled={loading}
                className="flex-1 bg-blue-500 text-white p-4 rounded-2xl hover:bg-blue-600 transition font-semibold shadow-md"
              >
                {loading ? "Enviando..." : "Enviar Verificación"}
              </button>
              <button
                onClick={() => handleSend("welcome")}
                disabled={loading}
                className="flex-1 bg-green-500 text-white p-4 rounded-2xl hover:bg-green-600 transition font-semibold shadow-md"
              >
                {loading ? "Enviando..." : "Enviar Bienvenida"}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE ÉXITO */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
            >
              <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
              <h2 className="text-xl font-bold mb-2">¡Correo enviado!</h2>
              <p className="mb-6">El correo se ha enviado correctamente a {formData.email}</p>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition font-semibold"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
