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
import { useState } from "react";
import { deleteRoomAction } from "../_lib/actions";
import { useRouter } from "next/navigation";

export default function RoomActionButton({
  propertyId,
  room,
  currImages,
  amenities,
}: {
  propertyId: string;
  room: Room;
  currImages: { url: string; key: string }[];
  amenities: { id: string; roomId: string; amenityId: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    await deleteRoomAction(room.id);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

            <DropdownMenuItem onClick={handleDelete}>
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditRoomDialog
        room={room}
        propertyId={propertyId}
        currImages={currImages}
        amenities={amenities}
        onSuccess={() => setOpen(false)}
      />
    </Dialog>
  );
}
