import React, { useState } from "react";
import { PawPrint, Menu, X } from "lucide-react";
import { useMobileDetect } from "@/common/hooks/use-mobile-detect";

/* ============================================================= *
 *  TopHeader – header fixo, responsivo
 * ------------------------------------------------------------- */
export const TopHeader: React.FC = () => {
  const isMobile = useMobileDetect();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div
          className="mx-auto flex h-16 max-w-7xl items-center 
        justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* ---------- Mobile ---------- */}
          {isMobile ? (
            <>
              <Logo />

              {/* container Doar + Hambúrguer */}
              <div className="flex flex-nowrap items-center gap-2">
                <DonateButton
                  onClick={() => console.log("doar")}
                  className="flex-shrink-0"
                />
                <HamburgerButton
                  open={menuOpen}
                  onClick={toggleMenu}
                  className="flex-shrink-0"
                />
              </div>
            </>
          ) : (
            /* ---------- Desktop ---------- */
            <>
              <DonateButton onClick={() => console.log("doar")} />
              <Logo />
              <div className="flex items-center gap-6">
                <LoginButton />
                <RegisterButton />
              </div>
            </>
          )}
        </div>
      </header>

      {/* ---------- Overlay menu (mobile) ---------- */}
      {isMobile && menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-white"
          onClick={toggleMenu}
        >
          {/* Botão X para fechar (opcional) */}
          <button className="self-end p-4 text-gray-800" onClick={toggleMenu}>
            <X className="h-6 w-6" />
          </button>
          {/* Conteúdo futuro do menu */}
        </div>
      )}
    </>
  );
};

/* ============================================================= *
 *  Sub-components (mesmo arquivo)
 * ------------------------------------------------------------- */

/* --- Doar ---------------------------------------------------- */
interface DonateButtonProps {
  onClick: () => void;
  size?: "sm" | "md";
  className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer bg-yellow-500 rounded-md border border-yellow-500 px-4 py-2 
    text-gray-800 transition-all duration-150 hover:-translate-y-0.5 
    hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)]"
    >
      Doar
    </button>
  );
};

/* --- Logo ---------------------------------------------------- */
const Logo: React.FC = () => (
  <div className="flex items-center gap-1 text-rose-500">
    <PawPrint className="h-6 w-6" />
    <span className="text-xl font-semibold">Amiguxus</span>
  </div>
);

/* --- Entrar -------------------------------------------------- */
const LoginButton: React.FC = () => (
  <button
    type="button"
    className="cursor-pointer text-gray-800 transition-transform 
    duration-150 hover:-translate-y-0.5"
  >
    Entrar
  </button>
);

/* --- Cadastrar ---------------------------------------------- */
const RegisterButton: React.FC = () => (
  <button
    type="button"
    className="cursor-pointer rounded-md border border-rose-500 px-4 py-2 
    text-gray-800 transition-all duration-150 hover:-translate-y-0.5 
    hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)]"
  >
    Cadastrar
  </button>
);

/* --- Hambúrguer --------------------------------------------- */
interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  open,
  onClick,
  className = "",
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer rounded-md p-2 text-gray-800 transition-colors
     hover:bg-gray-100 ${className}`}
  >
    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </button>
);
