// src/views/Clientes.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle, XCircle, Edit, Trash, Menu, BarChart3, Settings, X, Info, Home } from "lucide-react";
import img4 from "../assets/imges/na.png";

export default function Clientes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalCliente, setModalCliente] = useState(null);
  const [clientes, setClientes] = useState([]);

  // =========================
  // URL del backend desde variable de entorno
  // =========================
  const apiUrl = process.env.REACT_APP_API_URL;

  // =========================
  // CARGAR CLIENTES DESDE API
  // =========================
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/`);
        if (!res.ok) throw new Error("Error al obtener clientes");
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClientes();
  }, [apiUrl]);

  // =========================
  // FUNCIONES CRUD LOCALES
  // =========================
  const aceptarCliente = (id) =>
    setClientes(clientes.map(c => c.id === id ? { ...c, status: "Activo" } : c));

  const denegarCliente = (id) =>
    setClientes(clientes.map(c => c.id === id ? { ...c, status: "Denegado" } : c));

  const eliminarCliente = (id) =>
    setClientes(clientes.filter(c => c.id !== id));

  const editarCliente = (id) => {
    const nuevoNombre = prompt("Ingrese nuevo nombre del cliente:");
    if (nuevoNombre)
      setClientes(clientes.map(c => c.id === id ? { ...c, full_name: nuevoNombre } : c));
  };

  // =========================
  // ENVÍO DE CORREO DE BIENVENIDA
  // =========================
  const enviarCorreoBienvenida = async (cliente) => {
    try {
      const res = await fetch(`${apiUrl}/send-welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: cliente.email,
          fullName: cliente.full_name
        }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Error al enviar correo");
      console.log("Correo de bienvenida enviado a:", cliente.email);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // MENÚ LATERAL
  // =========================
  const menuItems = [
    { icon: <Home />, label: "Home DoorDash", path: "/home" },
    { icon: <BarChart3 />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users />, label: "Clientes", path: "/clientes" },
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
            <img src={img4} alt="Logo" className="w-12 h-12 md:w-48 md:h-28 object-contain" />
          </div>
          <X className="md:hidden cursor-pointer text-white" onClick={() => setSidebarOpen(false)} />
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
        <div className="w-full max-w-6xl">

          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold tracking-wide text-orange-600 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent"
            >
              Clientes
            </motion.h1>
            <Menu className="md:hidden cursor-pointer text-orange-600" onClick={() => setSidebarOpen(true)} />
          </div>

          {/* Tabla de clientes */}
          <div className="bg-white rounded-2xl shadow-md p-3 md:p-4 overflow-x-auto">
            <h2 className="text-sm md:text-base font-bold mb-2 text-orange-600 flex items-center gap-2">
              <Users className="w-5 h-5"/> Gestión de Clientes
            </h2>

            <table className="min-w-full text-left text-xs md:text-sm border-collapse">
              <thead className="bg-orange-100">
                <tr>
                  <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Nombre</th>
                  <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Email</th>
                  <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Edad</th>
                  <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Ciudad</th>
                  <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Estado</th>
                  <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <motion.tr
                    key={cliente.id}
                    whileHover={{ scale: 1.01, backgroundColor: "#fff7ed" }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="hover:bg-orange-50 transition-all"
                  >
                    <td className="p-2 md:p-3">{cliente.full_name}</td>
                    <td className="p-2 md:p-3">{cliente.email}</td>
                    <td className="p-2 md:p-3">{cliente.age}</td>
                    <td className="p-2 md:p-3">{cliente.city}</td>
                    <td className={`p-2 md:p-3 font-semibold ${cliente.status === "Activo" ? "text-green-600" : cliente.status === "Denegado" ? "text-red-600" : "text-yellow-600"}`}>
                      {cliente.status || "Pendiente"}
                    </td>
                    <td className="p-2 md:p-3 flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-green-500 text-white p-1 rounded-md"
                        onClick={async () => {
                          aceptarCliente(cliente.id);
                          await enviarCorreoBienvenida(cliente);
                        }}
                      >
                        <CheckCircle className="w-4 h-4"/>
                      </motion.button>

                      <motion.button whileHover={{ scale: 1.1 }} className="bg-red-500 text-white p-1 rounded-md" onClick={() => denegarCliente(cliente.id)}>
                        <XCircle className="w-4 h-4"/>
                      </motion.button>

                      <motion.button whileHover={{ scale: 1.1 }} className="bg-yellow-400 text-white p-1 rounded-md" onClick={() => editarCliente(cliente.id)}>
                        <Edit className="w-4 h-4"/>
                      </motion.button>

                      <motion.button whileHover={{ scale: 1.1 }} className="bg-gray-500 text-white p-1 rounded-md" onClick={() => eliminarCliente(cliente.id)}>
                        <Trash className="w-4 h-4"/>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-blue-500 text-white p-1 rounded-md flex items-center gap-1"
                        onClick={() => setModalCliente(cliente)}
                      >
                        <Info className="w-4 h-4"/> Más
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MODAL DE DETALLES */}
          {modalCliente && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
                <h2 className="text-xl font-bold text-orange-600 mb-4">{modalCliente.full_name} - Detalles</h2>
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 bg-blue-200"
                  onClick={() => setModalCliente(null)}
                >
                  X
                </button>
                <div className="grid grid-cols-1 gap-2">
                  <p><strong>Email:</strong> {modalCliente.email}</p>
                  <p><strong>Edad:</strong> {modalCliente.age}</p>
                  <p><strong>Ciudad:</strong> {modalCliente.city}</p>
                  <p><strong>Estado:</strong> {modalCliente.status || "Pendiente"}</p>
                  <p><strong>Modelo del vehículo:</strong> {modalCliente.vehicle_model}</p>
                  <p><strong>Año del vehículo:</strong> {modalCliente.vehicle_year}</p>
                  <p><strong>Color del vehículo:</strong> {modalCliente.color_vehicle}</p>
                  <p><strong>Lugar de residencia:</strong> {modalCliente.address_residential}</p>
                  <p><strong>Código postal:</strong> {modalCliente.postal_code}</p>
                  <p><strong>Teléfono:</strong> {modalCliente.phone_number}</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
