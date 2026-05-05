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
import { useActionState, useEffect, useState } from "react";
import FormSubmitButton from "./FormSubmitButton";
import PhotoUpload from "./PhotoUpload";
import FacilityTypeCard from "./FacilityTypeCard";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { roomSchema } from "../_lib/validation";

export default function AddRoomDialog() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  const initialState: ActionResponse = {
    success: false,
    errors: {},
  };

  const [state, formAction] = useActionState(addPropertyAction, initialState);

  useEffect(() => {
    if (state?.success) {
      toast.success("Property added!");
      router.push("/profile/properties");
      router.refresh();
    }

    if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the errors in the form");
    }
  }, [state]);

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
        <DialogContent className="w-6xl">
          <div className="bg-bg-light flex flex-col gap-10 p-8 rounded-2xl">
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
                  guests: formData.get("guests"),
                  bedrooms: formData.get("bedrooms"),
                  beds: formData.get("beds"),
                  baths: formData.get("baths"),
                };

                const uploadedRaw = formData.get("uploadedImages");
                const uploadedFiles: { url: string; key: string }[] =
                  uploadedRaw ? JSON.parse(uploadedRaw as string) : [];

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
                <div className="flex gap-2">
                  {/* GUESTS */}
                  <div>
                    <label
                      htmlFor="guests"
                      className="font-semibold text-lg mb-3 block"
                    >
                      Guests
                    </label>

                    <input
                      type="number"
                      placeholder="Number of guests"
                      name="guests"
                      defaultValue={1}
                      className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.guests ? "border-red-600" : ""}`}
                    />
                    <p className="text-red-600">{errors.guests?.[0]}</p>
                  </div>

                  {/* BEDROOMS */}
                  <div>
                    <label
                      htmlFor="bedrooms"
                      className="font-semibold text-lg mb-3 block"
                    >
                      Bedrooms
                    </label>

                    <input
                      type="number"
                      placeholder="Number of bedrooms"
                      name="bedrooms"
                      defaultValue={1}
                      className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.bedrooms ? "border-red-600" : ""}`}
                    />
                    <p className="text-red-600">{errors.bedrooms?.[0]}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {/* BEDS */}
                  <div>
                    <label
                      htmlFor="beds"
                      className="font-semibold text-lg mb-3 block"
                    >
                      Beds
                    </label>

                    <input
                      type="number"
                      placeholder="Number of beds"
                      name="beds"
                      defaultValue={1}
                      className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.beds ? "border-red-600" : ""}`}
                    />
                    <p className="text-red-600">{errors.beds?.[0]}</p>
                  </div>

                  {/* BATHS */}
                  <div>
                    <label
                      htmlFor="baths"
                      className="font-semibold text-lg mb-3 block"
                    >
                      Baths
                    </label>

                    <input
                      type="number"
                      placeholder="Number of baths"
                      name="baths"
                      defaultValue={1}
                      className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.baths ? "border-red-600" : ""}`}
                    />
                    <p className="text-red-600">{errors.baths?.[0]}</p>
                  </div>
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
