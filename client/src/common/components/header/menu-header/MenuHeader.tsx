import { useState } from "react";
import {
  AnimalMenuTabButton,
  AnimalType,
} from "../animal-menu-tab-button/AnimalMenuTabButton";
import { AnimalDropdownMenu } from "../animal-dropdown-menu/AnimalDropdownMenu";

export const MenuHeader = () => {
  const [activeAnimal, setActiveAnimal] = useState<AnimalType | null>(null);

  const handleTabClick = (animal: AnimalType) => {
    setActiveAnimal((prev) => (prev === animal ? null : animal));
  };

  const handleCloseMenu = () => setActiveAnimal(null);

  return (
    <header className="relative bg-white shadow">
      <AnimalMenuTabButton
        onTabClick={handleTabClick}
        activeAnimal={activeAnimal}
      />
      <AnimalDropdownMenu
        open={activeAnimal !== null}
        onClose={handleCloseMenu}
        animal={activeAnimal ?? "dogs"}
      />
    </header>
  );
};
