import { useState } from "react";
import { SiInstagram, SiFacebook, SiYoutube } from "react-icons/si";
import { FiMail, FiChevronDown } from "react-icons/fi";

export function Rodape() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpen((prev) => (prev === section ? null : section));
  };

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-0 md:grid md:grid-cols-4 gap-10">

        {/* LOGO / SOBRE */}
        <div className="md:col-span-3">
          <h4 className="text-lg font-bold">Biribol Brasil</h4>
          <p className="text-sm text-gray-400 mt-2">
            O melhor do biribol para você. Produtos oficiais e atendimento de verdade.
          </p>
        </div>

        {/* MENU COLAPSÁVEL MOBILE */}
        {[
          {
            title: "Redes sociais",
            links: [
              { label: "Instagram", icon: <SiInstagram />, href: "#" },
              { label: "Facebook", icon: <SiFacebook />, href: "#" },
              { label: "YouTube", icon: <SiYoutube />, href: "#" },
              { label: "E-mail", icon: <FiMail />, href: "#" },
            ],
          },
        ].map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="w-full flex justify-between items-center text-left text-md font-semibold mb-2 md:mb-4 md:cursor-default"
            >
              {section.title}
              <FiChevronDown
                className={`h-4 w-4 transition md:hidden ${open === section.title ? "rotate-180" : ""}`}
              />
            </button>

            <ul
              className={`space-y-2 text-sm text-gray-300 transition-all duration-300 ${
                open === section.title || typeof window === "undefined" ? "block" : "hidden md:block"
              }`}
            >
              {section.links.map((link: any, i: number) =>
                typeof link === "string" ? (
                  <li key={i}>
                    <a href="#" className="hover:underline">{link}</a>
                  </li>
                ) : (
                  <li key={i}>
                    <a href={link.href} className="flex items-center gap-2 hover:underline">
                      {link.icon}
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* RODAPÉ FINAL */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} Biribol Brasil. Todos os direitos reservados.
        <div>
          <a href="#" className="underline text-gray-400 hover:text-white">Política de privacidade</a>
        </div>
      </div>

      {/* VOLTAR AO TOPO */}
      <div className="fixed bottom-5 right-5 z-50">
        <a href="#top" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-md transition">
          ↑
        </a>
      </div>
    </footer>
  );
}
