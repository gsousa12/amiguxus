import { PawPrint } from "lucide-react";

export const TopHeader = () => {
  return (
    <header className="w-full bg-white border-b">
      <div className="relative flex items-center h-16 mx-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
          <PawPrint className="text-rose-500 w-7 h-7" />
          <span className="text-xl font-bold text-rose-600">Amiguxos</span>
        </div>
        <div className="ml-auto flex items-center gap-4 pr-4">
          <button className="text-rose-600 font-medium hover:cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
            Entrar
          </button>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-md font-medium hover:bg-rose-600 hover:cursor-pointer transition-transform duration-200 hover:-translate-y-0.5">
            Cadastrar
          </button>
        </div>
      </div>
    </header>
  );
};
