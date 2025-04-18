import { ReactNode } from "react";

interface ModalProps {
  aberto: boolean;
  titulo?: string;
  children: ReactNode;
}

export function Modal({ aberto, titulo, children }: ModalProps) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
        {titulo && <h2 className="text-lg font-bold mb-4">{titulo}</h2>}
        {children}
      </div>
    </div>
  );
}