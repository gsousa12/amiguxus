import React from "react";
import { useNavigate } from "react-router-dom";
import { DogSVG } from "@/common/assets/sgv/DogSgv";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-rose-50 to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute -top-6 left-6 text-6xl opacity-10">🐾</span>
        <span className="absolute top-24 right-10 text-5xl opacity-10">🐾</span>
        <span className="absolute bottom-16 left-10 text-7xl opacity-10">
          🐾
        </span>
      </div>

      <section className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:py-14 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-flex items-center gap-2 self-start rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
            <span className="text-rose-500">❤️</span>
            Conectando corações em Crateús-CE
          </div>

          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Amiguxus
          </h1>

          <p className="mt-3 text-base leading-relaxed text-gray-700 sm:text-lg">
            Encontre ou doe um amigo peludo de forma simples e carinhosa. Nosso
            app aproxima quem deseja adotar de quem precisa doar, com foco
            inicial em cães e gatos de Crateús-CE e apoio à Associação{" "}
            <span className="font-semibold text-rose-600">
              Bicho Cuidado Crateús
            </span>
            .
          </p>

          <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-800">
            Projeto acadêmico da Universidade Federal do Ceará — Campus Crateús.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/search")}
              className="rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold 
              text-white shadow-sm transition hover:bg-rose-700 hover:cursor-pointer  focus:outline-none 
              focus:ring-2 focus:ring-rose-400"
            >
              Quero adotar
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="rounded-lg border border-rose-300 bg-white px-5 py-2.5
               text-sm font-semibold text-rose-700 transition hover:bg-rose-50 hover:cursor-pointer 
               focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              Cadastrar pet
            </button>

            <button
              type="button"
              onClick={() => navigate("/donations")}
              className="text-sm font-medium text-rose-700 underline underline-offset-4
               hover:text-rose-800 hover:cursor-pointer "
            >
              Fazer doação
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-600">
            Simples, direto e com carinho: cadastre pets para adoção, filtre por
            raça/porte/idade/localização, envie solicitação de contato e marque
            como adotado quando tudo der certo.
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-rose-200/40 blur-2xl"></div>

          <div className="rounded-3xl border border-rose-100 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -right-5 -top-5 h-10 w-10 animate-bounce rounded-full bg-rose-100 text-center leading-10 text-2xl">
                  🐶
                </div>
                <div className="absolute -left-4 bottom-0 h-9 w-9 animate-pulse rounded-full bg-rose-100 text-center leading-9 text-xl">
                  🐱
                </div>
                <div className="h-40 w-40 sm:h-48 sm:w-48">
                  <DogSVG />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-rose-800">
              <div className="rounded-lg bg-rose-50 p-3">
                <div className="text-lg">📝</div>
                Cadastro de Pets
              </div>
              <div className="rounded-lg bg-rose-50 p-3">
                <div className="text-lg">🔎</div>
                Busca e Filtros
              </div>
              <div className="rounded-lg bg-rose-50 p-3">
                <div className="text-lg">💬</div>
                Contato Direto
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-rose-900">
                Apoie a causa animal em Crateús
              </h2>
              <p className="mt-1 text-sm text-rose-900/80">
                Somos parceiros da Associação Bicho Cuidado Crateús. Sua doação
                ajuda no cuidado e bem-estar de cães e gatos resgatados.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Amiguxus — Projeto acadêmico da Universidade Federal do Ceará (UFC) —
          Campus Crateús.
        </p>
      </section>
    </main>
  );
};
