"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useState } from "react";
import FormSubmitButton from "./FormSubmitButton";
import PhotoUpload from "./PhotoUpload";
import FacilityTypeCard from "./FacilityTypeCard";

export default function AddRoomDialog() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <button className="flex flex-col gap-1 items-center justify-center border-3 border-dashed border-bg-dark hover:bg-bg transition-colors text-text-muted rounded-xl px-5 py-8 cursor-pointer">
              <span>
                <Plus size={20} />
              </span>
              Add Room
            </button>
          }
        />
        <DialogContent className="sm:w-4xl">
          <div className="bg-bg-light flex flex-col gap-10 p-8 rounded-2xl">
            <h2 className="text-xl font-semibold">Add Room</h2>
            <form action="" className="flex gap-10" noValidate>
              <div className="flex flex-col gap-5 w-full">
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="font-semibold text-lg mb-3 block"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    placeholder="Room name"
                    name="name"
                    required
                    className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.name ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.name?.[0]}</p>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <label
                    htmlFor="description"
                    className="font-semibold text-lg mb-3 block"
                  >
                    Description
                  </label>

                  <textarea
                    placeholder="Room description"
                    name="description"
                    required
                    className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.description ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.description?.[0]}</p>
                </div>

                {/* PRICE */}
                <div>
                  <label
                    htmlFor="price"
                    className="font-semibold text-lg mb-3 block"
                  >
                    Price
                  </label>

                  <input
                    type="text"
                    placeholder="Room price"
                    name="price"
                    required
                    className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.price ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.price?.[0]}</p>
                </div>

                {/* DISCOUNT */}
                <div>
                  <label
                    htmlFor="discount"
                    className="font-semibold text-lg mb-3 block"
                  >
                    Discount
                  </label>

                  <input
                    type="text"
                    placeholder="Room discount"
                    name="discount"
                    required
                    className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.discount ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.discount?.[0]}</p>
                </div>

                {/* FACILITIES */}
                <div>
                  <label
                    htmlFor=""
                    className="font-semibold text-lg mb-3 block"
                  >
                    Facilties
                  </label>

                  <div className="flex gap-3">
                    <FacilityTypeCard icon="Wifi" name="type" value="wifi">
                      Wifi
                    </FacilityTypeCard>
                    <FacilityTypeCard icon="AC" name="type" value="ac">
                      AC
                    </FacilityTypeCard>
                    <FacilityTypeCard icon="TV" name="type" value="tv">
                      TV
                    </FacilityTypeCard>
                    <FacilityTypeCard
                      icon="Laundry"
                      name="type"
                      value="laundry"
                    >
                      Laundry
                    </FacilityTypeCard>
                    <FacilityTypeCard
                      icon="Kitchen"
                      name="type"
                      value="kitchen"
                    >
                      Kitchen
                    </FacilityTypeCard>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 border-l-2 border-bg pl-10 w-full">
                {/* CAPACITY */}
                <div>
                  <label
                    htmlFor="capacity"
                    className="font-semibold text-lg mb-3 block"
                  >
                    Capacity
                  </label>

                  <input
                    type="text"
                    placeholder="Room capacity"
                    name="capacity"
                    required
                    className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.capacity ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.capacity?.[0]}</p>
                </div>

                {/* PHOTOS */}
                <div>
                  <PhotoUpload />
                  <p className="text-red-600">{errors.images?.[0]}</p>
                </div>

                <FormSubmitButton>Add Room</FormSubmitButton>
              </div>
            </form>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
