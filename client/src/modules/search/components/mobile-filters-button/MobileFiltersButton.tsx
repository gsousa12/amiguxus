import { Button } from "@/common/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/common/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { FiltersPanel } from "../filters-panel/FiltersPanel";

export const MobileFiltersButton: React.FC<any> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-4 md:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4 text-rose-500" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-6">
        <FiltersPanel {...props} />
      </SheetContent>
    </Sheet>
  );
};
