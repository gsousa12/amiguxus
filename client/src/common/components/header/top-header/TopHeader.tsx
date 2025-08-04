import React, { useState } from "react";
import { PawPrint, Menu, X, Bell, LogOut, User } from "lucide-react";
import { useMobileDetect } from "@/common/hooks/use-mobile-detect";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { logoutDispatch } from "@/common/api/dispatch/auth-dispatchs";
import { useAuthStore } from "@/common/stores/auth/auth-store";
import { getOnlyFirstName } from "@/common/lib/utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: string;
}

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<IconButtonProps>
>(({ children, tooltip, className = "", ...props }, ref) => (
  <button
    ref={ref}
    title={tooltip}
    className={`
      cursor-pointer rounded-md p-2 text-gray-800 transition
      hover:bg-gray-100 ${className}
    `}
    {...props}
  >
    {children}
  </button>
));

IconButton.displayName = "IconButton";

export const TopHeader: React.FC = () => {
  const isMobile = useMobileDetect();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((p) => !p);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <DonateButton onClick={() => {}} />
          <Logo className="absolute left-1/2 -translate-x-1/2" />
          {!isMobile ? (
            <DesktopActions />
          ) : (
            <MobileActions menuOpen={menuOpen} toggleMenu={toggleMenu} />
          )}
        </div>
      </header>

      {isMobile && menuOpen && <MobileOverlay toggleMenu={toggleMenu} />}
    </>
  );
};

// --- DesktopActions ---
export const DesktopActions: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const navigateToRegisterPet = () => {
    if (!isAuthenticated) {
      navigate("/home");
      return;
    }
    navigate("/register");
  };

  const handleLogout = async () => {
    try {
      await logoutDispatch();
    } finally {
      logout();
    }
  };

  return (
    <div className="ml-auto flex items-center gap-4">
      {!isAuthenticated ? (
        <>
          <LoginButton />
          <RegisterButton />
        </>
      ) : (
        <>
          {/* {user && (
            <span className="text-sm font-medium text-gray-800">
              Olá, {getOnlyFirstName(user.full_name)}
            </span>
          )} */}

          <NotificationBell />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton tooltip="Perfil">
                <User className="h-5 w-5 text-rose-500" />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={4}
              className="w-40 bg-white border border-rose-100 hover:cursor-pointer shadow-lg"
            >
              <DropdownMenuItem
                onSelect={navigateToRegisterPet}
                className="px-4 py-2 hover:bg-rose-50 hover:cursor-pointer text-gray-700"
              >
                Cadastrar Pet
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {}}
                className="px-4 py-2 hover:bg-rose-50 hover:cursor-pointer text-gray-700"
              >
                Meus Pets
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <IconButton onClick={handleLogout} tooltip="Sair">
            <LogOut className="h-5 w-5 text-rose-500" />
          </IconButton>
        </>
      )}
    </div>
  );
};

// --- MobileActions ---
const MobileActions: React.FC<{
  menuOpen: boolean;
  toggleMenu: () => void;
}> = ({ menuOpen, toggleMenu }) => (
  <div className="ml-auto flex items-center gap-2">
    <NotificationBell />
    <HamburgerButton open={menuOpen} onClick={toggleMenu} />
  </div>
);

// --- MobileOverlay ---
const MobileOverlay: React.FC<{ toggleMenu: () => void }> = ({
  toggleMenu,
}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutDispatch();
    } finally {
      logout();
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-white">
      <button
        onClick={toggleMenu}
        className="self-end p-4 text-gray-800 hover:opacity-70"
      >
        <X className="h-6 w-6" />
      </button>

      <nav className="flex flex-col gap-4 px-6">
        <MenuItem
          label="Ache um doguinho para adotar"
          onClick={() => handleNavigate("/search/dog")}
        />
        <MenuItem
          label="Ache um gatinho para adotar"
          onClick={() => handleNavigate("/search/cat")}
        />

        {!isAuthenticated ? (
          <>
            <MenuItem
              label="Entrar"
              onClick={() => handleNavigate("/sign-in")}
            />
            <MenuItem
              label="Cadastrar"
              onClick={() => handleNavigate("/sign-up")}
            />
          </>
        ) : (
          <MenuItem
            label="Sair"
            icon={LogOut}
            onClick={handleLogout}
            textColor="text-rose-500"
          />
        )}
      </nav>
    </div>
  );
};

// --- Components auxiliares ---
const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
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

const DonateButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="cursor-pointer rounded-md border border-yellow-500
      bg-yellow-500 px-4 py-2 text-gray-800 transition hover:-translate-y-0.5
      hover:shadow-md"
  >
    Doar
  </button>
);

const LoginButton: React.FC = () => {
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

const RegisterButton: React.FC = () => {
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

const NotificationBell: React.FC = () => (
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

const HamburgerButton: React.FC<{
  open: boolean;
  onClick: () => void;
}> = ({ open, onClick }) => (
  <IconButton onClick={onClick} tooltip="Menu">
    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </IconButton>
);

interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ElementType;
  textColor?: string;
}
const MenuItem: React.FC<MenuItemProps> = ({
  label,
  onClick,
  icon: Icon,
  textColor,
}) => (
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
