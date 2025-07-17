import React from "react";
import { Cat, Dog } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../../ui/navigation-menu";
import { Link } from "react-router-dom";

export const MenuHeader: React.FC = () => (
  <header className="hidden md:block border-b bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex gap-8">
            <CategoryNavMenu
              icon={Cat}
              label="Gatos"
              links={[
                {
                  to: "/search",
                  label: "Encontrar todos os gatos disponíveis",
                },
                { to: "/search", label: "Encontrar gatinhos filhotes" },
                { to: "/search", label: "Encontrar gatinhos idosos" },
              ]}
            />
            <CategoryNavMenu
              icon={Dog}
              label="Cachorros"
              links={[
                {
                  to: "/search",
                  label: "Encontrar todos os cachorros disponíveis",
                },
                { to: "/search", label: "Encontrar cachorrinhos filhotes" },
                { to: "/search", label: "Encontrar cachorrinhos idosos" },
              ]}
            />
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  </header>
);

interface CategoryNavMenuProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  links: { to: string; label: string }[];
}

const CategoryNavMenu: React.FC<CategoryNavMenuProps> = ({
  icon: Icon,
  label,
  links,
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger
      className="
        flex items-center gap-1 bg-transparent
        text-gray-800 hover:text-rose-500
        focus:outline-none
      "
    >
      <Icon className="h-5 w-5 text-rose-500" />
      {label}
    </NavigationMenuTrigger>

    <NavigationMenuContent
      className="
        min-w-72 lg:min-w-96
        rounded-md bg-white p-4 shadow
      "
    >
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <NavigationMenuLink asChild>
              <Link
                to={link.to}
                className="
                  block rounded-md px-4 py-2
                  text-gray-800 transition-colors
                  hover:bg-rose-50 hover:text-rose-500
                  cursor-pointer
                "
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);
