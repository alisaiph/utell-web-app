"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useActionState, useEffect, useMemo, useState } from "react";
import FormSubmitButton from "./FormSubmitButton";
import PhotoUpload from "./PhotoUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { roomSchema } from "../_lib/validation";
import { addRoomAction } from "../_lib/actions";
import AmenityTypeCard from "./AmenityTypeCard";

export default function AddRoomDialog({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState(() => crypto.randomUUID());
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  const handleOpenChange = (next: boolean) => {
    if (next) {
      setRoomId(crypto.randomUUID()); // fresh roomId every time dialog opens, need it here so we can use in r2 url
      setErrors({});
    }
    setOpen(next);
  };

  const initialState = {
    success: false,
    errors: {},
  };

  const [state, formAction] = useActionState(addRoomAction, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("Room added!");
      handleOpenChange(false);
      router.refresh();
    }

    if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the errors in the form");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <button className="border-bg-dark hover:bg-bg text-text-muted flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-3 border-dashed px-5 py-8 transition-colors">
            <span>
              <Plus size={20} />
            </span>
            Add Room
          </button>
        }
      />
      <DialogContent className="w-6xl">
        <div className="bg-bg-light flex flex-col gap-10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold">Add Room</h2>
          <form
            action={formAction}
            noValidate
            className="flex gap-10"
            onSubmit={(e) => {
              // Client-side validation
              const formData = new FormData(e.currentTarget);

              const data = {
                name: formData.get("name"),
                description: formData.get("description"),
                facilities: formData.get("facilities"),
                price: formData.get("price"),
                discount: formData.get("discount"),
                type: formData.get("type"),
                guests: formData.get("guests"),
                bedrooms: formData.get("bedrooms"),
                beds: formData.get("beds"),
                baths: formData.get("baths"),
              };

              const uploadedRaw = formData.get("uploadedImages");
              const uploadedFiles: { url: string; key: string }[] = uploadedRaw
                ? JSON.parse(uploadedRaw as string)
                : [];

              // Run validation
              const result = roomSchema.safeParse(data);

              const newErrors: any = {};

              // Zod validation
              if (!result.success) {
                Object.assign(newErrors, result.error.flatten().fieldErrors);
              }

              // Image validation
              if (uploadedFiles.length === 0 || uploadedFiles.length > 3) {
                newErrors.images = ["You must upload between 1 and 3 images"];
              }

              if (Object.keys(newErrors).length > 0) {
                e.preventDefault();
                setErrors(newErrors);
                return;
              }

              setErrors({});
            }}
          >
            <div className="flex w-full flex-col gap-5">
              {/* NAME */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-lg font-semibold"
                >
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Room name"
                  name="name"
                  required
                  className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.name ? "border-red-600" : ""}`}
                />
                <p className="text-red-600">{errors.name?.[0]}</p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-3 block text-lg font-semibold"
                >
                  Description
                </label>

                <textarea
                  placeholder="Room description"
                  name="description"
                  required
                  className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.description ? "border-red-600" : ""}`}
                />
                <p className="text-red-600">{errors.description?.[0]}</p>
              </div>

              {/* PRICE */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-3 block text-lg font-semibold"
                >
                  Price
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Room price"
                  name="price"
                  className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.price ? "border-red-600" : ""}`}
                />
                <p className="text-red-600">{errors.price?.[0]}</p>
              </div>

              {/* DISCOUNT */}
              <div>
                <label
                  htmlFor="discount"
                  className="mb-3 block text-lg font-semibold"
                >
                  Discount
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Room discount"
                  name="discount"
                  className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.discount ? "border-red-600" : ""}`}
                />
                <p className="text-red-600">{errors.discount?.[0]}</p>
              </div>

              {/* AMENITIES */}
              <div>
                <label htmlFor="" className="mb-3 block text-lg font-semibold">
                  Facilties
                </label>

                <div className="flex gap-3">
                  <AmenityTypeCard icon="Wifi" name="amenities" value="wifi">
                    Wifi
                  </AmenityTypeCard>
                  <AmenityTypeCard icon="AC" name="amenities" value="ac">
                    AC
                  </AmenityTypeCard>
                  <AmenityTypeCard icon="TV" name="amenities" value="tv">
                    TV
                  </AmenityTypeCard>
                  <AmenityTypeCard
                    icon="Laundry"
                    name="amenities"
                    value="laundry"
                  >
                    Laundry
                  </AmenityTypeCard>
                  <AmenityTypeCard
                    icon="Kitchen"
                    name="amenities"
                    value="kitchen"
                  >
                    Kitchen
                  </AmenityTypeCard>
                </div>
              </div>
            </div>

            <div className="border-bg flex w-full flex-col gap-5 border-l-2 pl-10">
              {/* TYPE */}
              <div>
                <label
                  htmlFor="type"
                  className="mb-3 block text-lg font-semibold"
                >
                  Type
                </label>

                <select
                  name="type"
                  defaultValue="Single"
                  className="border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none"
                >
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                  <option value="Family">Family</option>
                  <option value="Studio">Studio</option>
                </select>
                <p className="text-red-600">{errors.type?.[0]}</p>
              </div>

              <div className="flex gap-2">
                {/* GUESTS */}
                <div>
                  <label
                    htmlFor="guests"
                    className="mb-3 block text-lg font-semibold"
                  >
                    Guests
                  </label>

                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Number of guests"
                    name="guests"
                    defaultValue={1}
                    className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.guests ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.guests?.[0]}</p>
                </div>

                {/* BEDROOMS */}
                <div>
                  <label
                    htmlFor="bedrooms"
                    className="mb-3 block text-lg font-semibold"
                  >
                    Bedrooms
                  </label>

                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Number of bedrooms"
                    name="bedrooms"
                    defaultValue={1}
                    className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.bedrooms ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.bedrooms?.[0]}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {/* BEDS */}
                <div>
                  <label
                    htmlFor="beds"
                    className="mb-3 block text-lg font-semibold"
                  >
                    Beds
                  </label>

                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Number of beds"
                    name="beds"
                    defaultValue={1}
                    className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.beds ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.beds?.[0]}</p>
                </div>

                {/* BATHS */}
                <div>
                  <label
                    htmlFor="baths"
                    className="mb-3 block text-lg font-semibold"
                  >
                    Baths
                  </label>

                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Number of baths"
                    name="baths"
                    defaultValue={1}
                    className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.baths ? "border-red-600" : ""}`}
                  />
                  <p className="text-red-600">{errors.baths?.[0]}</p>
                </div>

                <input type="hidden" name="propertyId" value={propertyId} />
                <input type="hidden" name="roomId" value={roomId} />
              </div>

              {/* PHOTOS */}
              <div>
                <PhotoUpload
                  prefix={`property-images/${propertyId}/room-images/${roomId}`}
                />
                <p className="text-red-600">{errors.images?.[0]}</p>
              </div>

              <FormSubmitButton>Add Room</FormSubmitButton>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
