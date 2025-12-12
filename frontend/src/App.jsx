// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/home";
import AdminDashboard from "./views/AdminDashboard";
import Clientes from "./views/Clientes"; // Pantalla de clientes
import Config from "./views/configuracion"; // Pantalla de configuración (asegúrate que el archivo se llama Config.jsx)

function App() {
  return (
    <Router>
      <Routes>
        {/* Home como página principal */}
        <Route path="/" element={<Home />} />

        {/* Dashboard del administrador */}
        <Route path="/dashboard" element={<AdminDashboard />} />

        {/* Pantalla de clientes */}
        <Route path="/clientes" element={<Clientes />} />

        {/* Pantalla de configuración */}
        <Route path="/config" element={<Config />} />

        {/* Redirección: cualquier ruta no válida vuelve a Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
