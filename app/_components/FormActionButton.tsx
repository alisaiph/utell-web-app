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

export default function FormActionButton({
  propertyId,
}: {
  propertyId?: string;
  roomId?: string;
}) {
  return (
    <DropdownMenu>
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
          <DropdownMenuItem>
            <SquarePen />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {propertyId && (
          <DropdownMenuGroup>
            <DropdownMenuLabel>Rooms</DropdownMenuLabel>
            <Link href={`/profile/properties/manage/${propertyId}`}>
              <DropdownMenuItem>
                <HousePlus color="var(--utell-yellow)" />
                Manage
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
