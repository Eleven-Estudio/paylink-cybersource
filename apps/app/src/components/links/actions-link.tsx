import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@v1/ui/dropdown-menu";
import { Lucide } from "@v1/ui/lucide";
import { cn } from "@v1/ui/utils";

interface Props {
  id: number;
  className?: string;
}

const ActionsLink = ({ id, className }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          className={cn(
            "flex items-center justify-center py-1 px-1.5 rounded-lg hover:bg-neutral-50",
            className,
          )}
        >
          <Lucide.EllipsisVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Activar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsLink;
