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
import { useNotifications } from "@/common/api/queries/notifications/notifications-queries";
// import { getOnlyFirstName } from "@/common/lib/utils";

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
  // const user = useAuthStore((s) => s.user);
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
              <DropdownMenuItem
                onSelect={() => {}}
                className="px-4 py-2 hover:bg-rose-50 hover:cursor-pointer text-gray-700"
              >
                Favoritados
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
          onClick={() => handleNavigate("/search")}
        />
        <MenuItem
          label="Ache um gatinho para adotar"
          onClick={() => handleNavigate("/search")}
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

export const NotificationBell: React.FC = () => {
  const {
    data: notifications = [],
    isLoading,
    error,
  } = useNotifications({
    refetchInterval: 1000 * 60,
    staleTime: 1000 * 60,
    retry: 2,
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <IconButton tooltip="Notificações">
            <Bell className="h-5 w-5 text-gray-800" />
          </IconButton>
          {unreadCount > 0 && (
            <span
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center 
                         justify-center rounded-full bg-rose-500 
                         text-xs font-semibold text-white"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-85 p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-4 text-center text-sm text-gray-500">
            Carregando…
          </div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-rose-600">
            Erro ao carregar
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            Sem notificações por enquanto.
          </div>
        ) : (
          <ul className="max-h-64 overflow-y-auto divide-y divide-gray-100">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="px-4 py-2 hover:bg-rose-50 cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {n.title}
                  </span>
                  {!n.is_read && (
                    <span
                      className="inline-block h-2 w-2 rounded-full
                                 bg-rose-500 mt-1"
                      aria-label="Não lido"
                    />
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                  {n.message}
                </p>
                <time className="mt-1 block text-xs text-gray-400">
                  {new Date(n.created_at).toLocaleString()}
                </time>
              </li>
            ))}
          </ul>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
