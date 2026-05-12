"use client";

import PropertyTypeCard from "@/app/_components/PropertyTypeCard";
import { addPropertyAction } from "@/app/_lib/actions";
import MapPickerWrapper from "@/app/_components/MapPickerWrapper";
import PhotoUpload from "@/app/_components/PhotoUpload";
import { propertySchema } from "@/app/_lib/validation";
import { useActionState, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormSubmitButton from "@/app/_components/FormSubmitButton";

type ActionResponse = {
  success?: boolean;
  errors?: Record<string, string[]>;
};

export default function page() {
  const propertyId = useMemo(() => crypto.randomUUID(), []); // creating propertyId here, so we can use in r2 url
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const subOptions = {
    Male: ["Henveyru", "Galolhu", "Mahchangoalhi", "Maafannu"],
    Hulhumale: ["Phase 1", "Phase 2"],
    Vilimale: ["Vilimale"],
  };

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
    <div className="bg-bg-light flex flex-col gap-10 p-8 rounded-2xl">
      <h2 className="text-xl font-semibold">Add Property</h2>

      <form
        action={formAction}
        noValidate
        onSubmit={(e) => {
          // Client-side validation
          const formData = new FormData(e.currentTarget);

          const data = {
            type: formData.get("type"),
            name: formData.get("name"),
            description: formData.get("description"),
            address: formData.get("address"),
            city: formData.get("city"),
            area: formData.get("area"),
            contactPhone: formData.get("contactPhone"),
            contactEmail: formData.get("contactEmail"),
            location: formData.get("location"),
          };

          const uploadedRaw = formData.get("uploadedImages");
          const uploadedFiles: { url: string; key: string }[] = uploadedRaw
            ? JSON.parse(uploadedRaw as string)
            : [];

          // Run validation
          const result = propertySchema.safeParse(data);

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
        className="flex gap-10"
      >
        <div className="flex flex-col gap-10">
          {/* TYPE */}
          <div>
            <label htmlFor="" className="font-semibold text-lg mb-3 block">
              Type
            </label>

            <div className="flex gap-3">
              <PropertyTypeCard
                icon="House"
                name="type"
                value="Guest House"
                defaultChecked={true}
              >
                Guest House
              </PropertyTypeCard>
              <PropertyTypeCard icon="Building" name="type" value="Apartment">
                Apartment
              </PropertyTypeCard>
              <PropertyTypeCard icon="Hotel" name="type" value="Hotel">
                Hotel
              </PropertyTypeCard>
            </div>
          </div>

          {/* NAME */}
          <div>
            <label htmlFor="name" className="font-semibold text-lg mb-3 block">
              Name
            </label>

            <input
              type="text"
              placeholder="Property name"
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
              placeholder="Property description"
              name="description"
              required
              className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.description ? "border-red-600" : ""}`}
            />
            <p className="text-red-600">{errors.description?.[0]}</p>
          </div>

          {/* ADDRESS */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="address"
              className="font-semibold text-lg mb-3 block"
            >
              Address
            </label>

            <input
              type="text"
              placeholder="Property address"
              name="address"
              required
              className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.address ? "border-red-600" : ""}`}
            />
            <p className="text-red-600">{errors.address?.[0]}</p>

            <div className="flex gap-2">
              <select
                name="city"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory("");
                }}
                className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              >
                <option value="">City</option>
                <option value="Male">Male</option>
                <option value="Hulhumale">Hulhumale</option>
                <option value="Vilimale">Vilimale</option>
              </select>

              <select
                name="area"
                value={subCategory}
                onChange={(e) => {
                  setSubCategory(e.target.value);
                }}
                disabled={!category}
                className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              >
                <option value="">Area</option>
                {category &&
                  subOptions[category]?.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 border-l-2 border-bg pl-10 w-full">
          {/* LOCATION */}
          <div>
            <label
              htmlFor="location"
              className="font-semibold text-lg mb-3 block"
            >
              Select Location
            </label>

            <MapPickerWrapper />
          </div>

          {/* CONTACT */}
          <div>
            <label
              htmlFor="contact"
              className="font-semibold text-lg mb-3 block"
            >
              Contact
            </label>

            <div className="flex gap-2">
              <div>
                <input
                  type="text"
                  placeholder="Phone"
                  name="contactPhone"
                  required
                  className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.contactPhone ? "border-red-600" : ""}`}
                />
                <p className="text-red-600">{errors.contactPhone?.[0]}</p>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  name="contactEmail"
                  className={`border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow ${errors.contactEmail ? "border-red-600" : ""}`}
                />
                <p className="text-red-600">{errors.contactEmail?.[0]}</p>
              </div>

              <input type="hidden" name="propertyId" value={propertyId} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 border-l-2 border-bg pl-10 w-full">
          {/* PHOTOS */}
          <PhotoUpload prefix={`property-images/${propertyId}`} />
          <p className="text-red-600">{errors.images?.[0]}</p>

          <FormSubmitButton>Add Property</FormSubmitButton>
        </div>
      </form>
    </div>
  );
}
