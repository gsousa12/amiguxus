import React, { useState } from "react";
import { PawPrint, Menu, X, Bell, LogOut } from "lucide-react";
import { DogSVG } from "@/common/assets/sgv/DogSgv";
import { useAuth } from "../../contexts/auth-context";
import { useMobileDetect } from "@/common/hooks/use-mobile-detect";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { getOnlyFirstName, getUserName } from "@/common/lib/utils";
import { logoutDispatch } from "@/common/api/dispatch/auth-dispatchs";

/* ============================================================= */
export const TopHeader: React.FC = () => {
  const { isAuth } = useAuth(); // boolean | null
  const authenticated = !!isAuth; // força para boolean (true / false)

  const username = getUserName();
  const isMobile = useMobileDetect();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((p) => !p);

  /* ----------------------------------------------------------- */
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {/* ----------- ESQUERDA (Doar) ----------- */}
          <DonateButton onClick={() => {}} />

          {/* ----------- LOGO (central) ------------ */}
          <Logo className="absolute left-1/2 -translate-x-1/2" />

          {/* ----------- AÇÕES (direita) ----------- */}
          {!isMobile ? (
            <DesktopActions
              isAuth={authenticated} // <- aqui
              username={username}
            />
          ) : (
            <MobileActions
              isAuth={authenticated}
              menuOpen={menuOpen}
              toggleMenu={toggleMenu}
            />
          )}
        </div>
      </header>

      {/* ---------- Overlay (menu mobile) ---------- */}
      {isMobile && menuOpen && (
        <MobileOverlay isAuth={authenticated} toggleMenu={toggleMenu} />
      )}
    </>
  );
};

/* ============================================================= */
/*  Ações Desktop                                                 */
/* ============================================================= */
const DesktopActions = ({
  isAuth,
  username,
}: {
  isAuth: boolean;
  username: string | null;
}) => {
  const handleLogout = () => {
    try {
      logoutDispatch();
      sessionStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      // fixme - tratar erro de logout
    }
  };
  return (
    <div className="ml-auto flex items-center gap-4">
      {!isAuth ? (
        <>
          <LoginButton />
          <RegisterButton />
        </>
      ) : (
        <>
          <NotificationBell />
          <DogAvatar />
          {username && (
            <span className="text-sm font-medium text-gray-800">
              Olá, {getOnlyFirstName(username)}
            </span>
          )}
          <IconButton onClick={handleLogout} tooltip="Sair">
            <LogOut className="h-5 w-5" />
          </IconButton>
        </>
      )}
    </div>
  );
};

/* ============================================================= */
/*  Ações Mobile (header)                                         */
/* ============================================================= */
const MobileActions = ({
  isAuth,
  menuOpen,
  toggleMenu,
}: {
  isAuth: boolean;
  menuOpen: boolean;
  toggleMenu: () => void;
}) => (
  <div className="ml-auto flex items-center gap-2">
    <NotificationBell />
    <HamburgerButton open={menuOpen} onClick={toggleMenu} />
  </div>
);

/* ============================================================= */
/*  Mobile Overlay                                                */
/* ============================================================= */
const MobileOverlay = ({
  isAuth,
  toggleMenu,
}: {
  isAuth: boolean;
  toggleMenu: () => void;
}) => (
  <div
    className="fixed inset-0 z-40 flex flex-col bg-white"
    onClick={toggleMenu}
  >
    <button className="self-end p-4 text-gray-800 hover:opacity-70">
      <X className="h-6 w-6" />
    </button>

    <nav className="flex flex-col gap-4 px-6">
      <MenuItem label="Ache um doguinho para adotar" onClick={() => {}} />
      <MenuItem label="Ache um gatinho para adotar" onClick={() => {}} />

      {!isAuth ? (
        <>
          <MenuItem label="Entrar" onClick={() => {}} />
          <MenuItem label="Cadastrar" onClick={() => {}} />
        </>
      ) : (
        <MenuItem
          label="Sair"
          icon={LogOut}
          onClick={() => {}}
          textColor="text-rose-500"
        />
      )}
    </nav>
  </div>
);

/* ============================================================= */
/*  Sub-componentes                                               */
/* ============================================================= */

/* Logo */
const Logo = ({ className = "" }: { className?: string }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className={`flex cursor-pointer items-center gap-1 text-rose-500 ${className}`}
    >
      <PawPrint className="h-6 w-6" />
      <span className="text-xl font-semibold">Amiguxus</span>
    </div>
  );
};

/* Botão Doar */
const DonateButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="cursor-pointer rounded-md border border-yellow-500
      bg-yellow-500 px-4 py-2 text-gray-800 transition hover:-translate-y-0.5
      hover:shadow-md"
  >
    Doar
  </button>
);

/* Login/Register */
const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/sign-in")}
      className="cursor-pointer text-gray-800 transition hover:-translate-y-0.5"
    >
      Entrar
    </button>
  );
};
const RegisterButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/sign-up")}
      className="cursor-pointer rounded-md border border-rose-500 px-4 py-2
      text-gray-800 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      Cadastrar
    </button>
  );
};

/* Dog Avatar 32 px */
const DogAvatar = () => (
  <div className="h-8 w-15 cursor-pointer overflow-hidden rounded-full">
    <span className="text-sm">teste</span>
  </div>
);

/* Notificações */
const NotificationBell = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <IconButton tooltip="Notificações">
        <Bell className="h-5 w-5" />
      </IconButton>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-64">
      <p className="px-4 py-6 text-center text-sm text-gray-500">
        Sem notificações por enquanto.
      </p>
    </DropdownMenuContent>
  </DropdownMenu>
);

/* IconButton genérico */
interface IconButtonProps {
  onClick?: () => void;
  tooltip?: string;
  className?: string;
}
const IconButton: React.FC<React.PropsWithChildren<IconButtonProps>> = ({
  children,
  onClick,
  tooltip,
  className = "",
}) => (
  <button
    onClick={onClick}
    title={tooltip}
    className={`cursor-pointer rounded-md p-2 text-gray-800 transition 
      hover:bg-gray-100 ${className}`}
  >
    {children}
  </button>
);

/* Hambúrguer */
const HamburgerButton = ({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) => (
  <IconButton onClick={onClick} tooltip="Menu">
    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </IconButton>
);

/* Itens do overlay */
interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ElementType;
  textColor?: string;
}
const MenuItem = ({ label, onClick, icon: Icon, textColor }: MenuItemProps) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 rounded-md px-4 py-3 
      text-left font-medium transition hover:bg-gray-100
      ${textColor ?? "text-gray-800"} cursor-pointer`}
  >
    {Icon && <Icon className="h-5 w-5" />}
    {label}
  </button>
);
