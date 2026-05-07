"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, SquarePen, Trash } from "lucide-react";
import EditRoomDialog from "./EditRoomDialog";
import { Room } from "../_types/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function RoomActionButton({
  propertyId,
  room,
  images,
}: {
  propertyId: string;
  room: Room;
  images: string[];
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
            <DropdownMenuLabel>Room</DropdownMenuLabel>

            <DialogTrigger className="w-full">
              <DropdownMenuItem>
                <SquarePen />
                Edit
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditRoomDialog room={room} propertyId={propertyId} images={images} />
    </Dialog>
  );
}
