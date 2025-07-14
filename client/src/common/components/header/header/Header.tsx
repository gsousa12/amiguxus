import { MenuHeader } from "../menu-header/MenuHeader";
import { TopHeader } from "../top-header/TopHeader";

export const Header = () => {
  return (
    <div className="flex flex-col">
      <TopHeader />
      <MenuHeader />
    </div>
  );
};
