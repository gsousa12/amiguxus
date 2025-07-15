import { DogSVG } from "@/common/assets/sgv/DogSgv";

/**
 * Página inicial provisória
 * Exibe uma mensagem de “em construção” acompanhada do mascote.
 */
export const HomePage: React.FC = () => (
  <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-8">
    <div className="flex max-w-xl flex-col items-center gap-6 rounded-lg  bg-white p-8  sm:flex-row sm:gap-10">
      {/* Mensagem */}
      <p className="text-center text-lg font-medium text-gray-800 sm:text-left">
        A página ainda está em construção.
        <br />
        Volte em breve para ver todas as novidades do{" "}
        <span className="text-rose-500">Amiguxus</span>!
      </p>

      {/* Mascote */}
      <div className="h-28 w-28 flex-shrink-0">
        <DogSVG />
      </div>
    </div>
  </main>
);
