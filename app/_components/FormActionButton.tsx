"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

export default function FormActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <div className="relative">
    //   <button
    //     className="p-2 w-10 rounded-md hover:bg-bg transition-colors cursor-pointer"
    //     onClick={(e) => {
    //       e.preventDefault();
    //       e.stopPropagation();
    //       setIsOpen(!isOpen);
    //     }}
    //   >
    //     <EllipsisVertical />
    //   </button>

    //   <ul
    //     className={`absolute bg-bg-light p-3 rounded-sm shadow-md ${isOpen ? "block" : "hidden"} left-10 top-0`}
    //   >
    //     <li>Edit</li>
    //     <li>Delete</li>
    //   </ul>
    // </div>
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="p-2 rounded-md w-10 hover:bg-bg cursor-pointer transition-colors">
            <EllipsisVertical />
          </button>
        }
      />
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
