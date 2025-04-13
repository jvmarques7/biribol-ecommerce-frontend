import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white overflow-hidden">
      {/* Fundo com imagem aquática suave */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1583164291580-9c361a7cf84c?auto=format&fit=crop&w=1950&q=80')",
        }}
      ></div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl text-center px-6 sm:px-10 lg:px-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-md">
          Bem-vindo à <span className="text-[#ffdd00]">Biribol Brasil</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 drop-shadow-sm">
          Equipamentos oficiais para praticantes, clubes e apaixonados por biribol. Qualidade que faz a diferença na água 🌊🏐
        </p>
        <Link
          to="/produtos"
          className="inline-block bg-white text-[#0077b6] font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-[#ffdd00] hover:text-black transition"
        >
          Ver Produtos
        </Link>
      </div>
    </div>
  )
}
