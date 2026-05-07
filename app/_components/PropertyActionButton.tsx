"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, HousePlus, SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";

export default function PropertyActionButton({
  propertyId,
}: {
  propertyId: string;
}) {
  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          render={
            <button className="p-2 rounded-md w-10 hover:bg-bg cursor-pointer transition-colors">
              <EllipsisVertical />
            </button>
          }
        />
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Property</DropdownMenuLabel>

            <Link href={`/profile/properties/edit/${propertyId}`}>
              <DropdownMenuItem>
                <SquarePen />
                Edit
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuLabel>Rooms</DropdownMenuLabel>
            <Link href={`/profile/properties/manage/${propertyId}`}>
              <DropdownMenuItem>
                <HousePlus color="var(--utell-yellow)" />
                Manage
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
