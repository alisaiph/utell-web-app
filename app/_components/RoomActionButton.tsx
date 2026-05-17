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
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import DeleteDialog from "./DeleteDialog";
import { InferSelectModel } from "drizzle-orm";
import { roomsTable } from "../_lib/db/schema";

type Room = InferSelectModel<typeof roomsTable>;

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
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          render={
            <button className="hover:bg-bg w-10 cursor-pointer rounded-md p-2 transition-colors">
              <EllipsisVertical />
            </button>
          }
        />
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Room</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                setEditOpen(true);
              }}
            >
              <SquarePen />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setDeleteOpen(true);
              }}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <EditRoomDialog
          room={room}
          propertyId={propertyId}
          currImages={currImages}
          amenities={amenities}
          onSuccess={() => setEditOpen(false)}
        />
      </Dialog>

      <DeleteDialog
        roomId={room.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      />
    </>
  );
}
