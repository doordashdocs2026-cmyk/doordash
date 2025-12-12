// src/views/Config.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import img4 from "../assets/imges/na.png"; // logo del sidebar
import adminPhoto from "../assets/imges/4.png"; // foto del admin
import { Menu, Settings, User, X, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Config() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState({
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@example.com",
    phone: "555-1234",
    role: "Administrador",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    alert("Datos guardados correctamente!");
  };

  // Menú actualizado con Home DoorDash
  const menuItems = [
    { icon: <Home />, label: "Home DoorDash", path: "/home" },
    { icon: <Settings />, label: "Dashboard", path: "/dashboard" },
    { icon: <User />, label: "Clientes", path: "/clientes" },
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
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.path}
                className="flex items-center gap-2 md:gap-3 text-white font-medium p-2 md:p-3 rounded-lg cursor-pointer hover:bg-white hover:text-orange-600 text-sm md:text-sm transition-all"
              >
                {item.icon} {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-6 md:p-8 flex flex-col gap-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="text-2xl md:text-3xl font-bold tracking-wide text-orange-600 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent"
          >
            Perfil del Administrador
          </motion.h1>
          <Menu
            className="md:hidden cursor-pointer text-orange-600"
            onClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* Tarjeta de foto y nombre */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={adminPhoto}
            alt="Foto Administrador"
            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-orange-400"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl font-bold">{adminData.firstName} {adminData.lastName}</h2>
            <p className="text-gray-500">{adminData.role}</p>
            <p className="text-gray-600">{adminData.email}</p>
          </div>
        </motion.div>

        {/* Formulario editable */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-4"
          whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-orange-600 font-bold text-xl mb-4">Editar Información</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={adminData.firstName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={adminData.lastName}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={adminData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-xl shadow-md transition-all"
          >
            Guardar Cambios
          </button>
        </motion.div>
      </main>
    </div>
  );
}
