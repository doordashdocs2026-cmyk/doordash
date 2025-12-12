// src/TestTailwind.jsx
export default function TestTailwind() {
  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col gap-8 items-center">
      {/* Título */}
      <h1 className="text-5xl font-extrabold text-indigo-600">Tailwind Playground</h1>

      {/* Botones */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105">
          Azul
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105">
          Verde
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105">
          Rojo
        </button>
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded shadow-md transition-transform transform hover:scale-105">
          Amarillo
        </button>
      </div>

      {/* Cards en grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Card 1</h2>
          <p className="text-gray-700">Esto es una tarjeta de ejemplo con Tailwind CSS.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Card 2</h2>
          <p className="text-gray-700">Prueba la responsividad y las sombras de Tailwind.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-2">Card 3</h2>
          <p className="text-gray-700">Agrega colores, padding, bordes y más utilidades.</p>
        </div>
      </div>

      {/* Inputs / Formulario */}
      <div className="flex flex-col gap-4 w-full max-w-md mt-8">
        <input
          type="text"
          placeholder="Nombre"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Enviar
        </button>
      </div>

      {/* Animaciones */}
      <div className="flex gap-6 mt-8">
        <div className="w-16 h-16 bg-red-500 rounded-full animate-bounce"></div>
        <div className="w-16 h-16 bg-green-500 rounded-full animate-spin"></div>
        <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

      <p className="mt-6 text-gray-600 text-center">
        Si todo esto se ve y anima correctamente, Tailwind está funcionando a la perfección ✅
      </p>
    </div>
  )
}
