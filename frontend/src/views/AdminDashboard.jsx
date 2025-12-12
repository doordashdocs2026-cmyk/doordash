// src/views/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import img4 from "../assets/imges/na.png";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Menu, BarChart3, Users, Settings, Activity, X, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clientes, setClientes] = useState([]);

  // Función para traer clientes
  const fetchClientes = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/");
      const data = await res.json();
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
    }
  };

  // Cargar clientes al iniciar y cada 5 segundos
  useEffect(() => {
    fetchClientes(); // carga inicial
    const interval = setInterval(fetchClientes, 5000); // refresco cada 5s
    return () => clearInterval(interval); // limpiar intervalo al desmontar
  }, []);

  const data = [
    { name: "Ene", ventas: 400 },
    { name: "Feb", ventas: 600 },
    { name: "Mar", ventas: 800 },
    { name: "Abr", ventas: 700 },
    { name: "May", ventas: 900 },
  ];

  const cards = [
    { title: "Usuarios", value: clientes.length.toString(), change: "+12%", icon: <Users className="text-white" /> },
    { title: "Actividad", value: "4,320", change: "+8%", icon: <Activity className="text-white" /> },
    { title: "Ingresos", value: "$12.560", change: "+22%", icon: <BarChart3 className="text-white" /> },
  ];

  const menuItems = [
    { icon: <Home />, label: "Home DoorDash", path: "/home" },
    { icon: <BarChart3 />, label: "Dashboard", path: "/dashboard" },
    { icon: <Users />, label: "Clientes", path: "/clientes" },
    { icon: <Settings />, label: "Configuración", path: "/config" },
  ];

  return (
    <div className="flex min-h-screen font-sans text-gray-800 bg-orange-50 overflow-hidden">
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
              alt="Logo DoorDash"
              className="w-12 h-12 md:w-48 md:h-28 object-contain"
            />
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
      <main className="flex-1 p-3 md:p-6 flex flex-col overflow-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="text-2xl md:text-3xl font-bold tracking-wide text-orange-600 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent"
          >
            Dashboard
          </motion.h1>
          <Menu
            className="md:hidden cursor-pointer text-orange-600"
            onClick={() => setSidebarOpen(true)}
          />
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 p-3 md:p-4 rounded-2xl shadow-md text-white cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm md:text-sm">{card.title}</h3>
                <div className="p-2 bg-orange-600 bg-opacity-30 rounded-full">
                  {card.icon}
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold">{card.value}</p>
              <p className="text-xs md:text-sm">{card.change} este mes</p>
            </motion.div>
          ))}
        </div>

        {/* GRÁFICAS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
          {/* BAR CHART */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white rounded-2xl p-3 md:p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-sm md:text-base font-bold mb-2 text-orange-600">Ventas Mensuales</h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data}>
                <defs>
                  <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fcd34d"/>
                <XAxis dataKey="name" fontSize={12}/>
                <Tooltip />
                <Bar dataKey="ventas" fill="url(#orangeGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* LINE CHART */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="bg-white rounded-2xl p-3 md:p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-sm md:text-base font-bold mb-2 text-orange-600">Crecimiento</h2>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fcd34d"/>
                <XAxis dataKey="name" fontSize={12}/>
                <Tooltip />
                <Line type="monotone" dataKey="ventas" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* TABLA DE CLIENTES */}
        <div className="mt-4 md:mt-6 bg-white rounded-2xl shadow-md p-3 md:p-4 overflow-x-auto">
          <h2 className="text-sm md:text-base font-bold mb-2 text-orange-600">Últimos Clientes</h2>

          <table className="min-w-full text-left text-xs md:text-sm border-collapse">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Nombre</th>
                <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Email</th>
                <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Teléfono</th>
                <th className="p-2 md:p-3 border-b text-orange-600 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, idx) => (
                <motion.tr
                  key={idx}
                  whileHover={{ scale: 1.01, backgroundColor: "#fff7ed" }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="hover:bg-orange-50 transition-all"
                >
                  <td className="p-2 md:p-3">{cliente.full_name}</td>
                  <td className="p-2 md:p-3">{cliente.email}</td>
                  <td className="p-2 md:p-3">{cliente.phone_number}</td>
                  <td className="p-2 md:p-3">{new Date(cliente.created_at).toLocaleDateString()}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
