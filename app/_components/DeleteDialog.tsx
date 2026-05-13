import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePropertyAction, deleteRoomAction } from "../_lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash } from "lucide-react";

export default function DeleteDialog({
  roomId,
  propertyId,
  open,
  onOpenChange,
}: {
  roomId?: string;
  propertyId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (roomId) {
        await deleteRoomAction(roomId);
        toast.success("Room deleted!");
      } else if (propertyId) {
        await deletePropertyAction(propertyId);
        toast.success("Property deleted!");
      }

      router.refresh();
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Failed to delete!");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {roomId
              ? " This will delete the room."
              : "This will delete the property and all its rooms."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
