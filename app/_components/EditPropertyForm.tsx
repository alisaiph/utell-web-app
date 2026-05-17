"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { propertySchema } from "../_lib/validation";
import PropertyTypeCard from "./PropertyTypeCard";
import MapPickerWrapper from "./MapPickerWrapper";
import PhotoUpload from "./PhotoUpload";
import FormSubmitButton from "./FormSubmitButton";
import { updatePropertyAction } from "../_lib/actions";
import { InferSelectModel } from "drizzle-orm";
import { propertiesTable } from "../_lib/db/schema";

type Property = InferSelectModel<typeof propertiesTable>;

export default function EditPropertyForm({
  property,
  currImages,
}: {
  property: Property;
  currImages: { url: string; key: string }[];
}) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();
  const [category, setCategory] = useState(property.city || "");
  const [subCategory, setSubCategory] = useState(property.area || "");

  const subOptions: Record<string, string[]> = {
    Male: ["Henveyru", "Galolhu", "Mahchangoalhi", "Maafannu"],
    Hulhumale: ["Phase 1", "Phase 2"],
    Vilimale: ["Vilimale"],
  };

  const initialState = {
    success: false,
    errors: {},
  };

  const [state, formAction] = useActionState(
    updatePropertyAction,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Property updated!");
      router.push("/profile/properties");
      router.refresh();
    }

    if (state?.errors && Object.keys(state.errors).length > 0) {
      toast.error("Please fix the errors in the form");
    }
  }, [state]);

  return (
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
          <label htmlFor="" className="mb-3 block text-lg font-semibold">
            Type
          </label>

          <div className="flex gap-3">
            <PropertyTypeCard
              icon="House"
              name="type"
              value="Guest House"
              defaultChecked={property.type === "Guest House"}
            >
              Guest House
            </PropertyTypeCard>
            <PropertyTypeCard
              icon="Building"
              name="type"
              value="Apartment"
              defaultChecked={property.type === "Apartment"}
            >
              Apartment
            </PropertyTypeCard>
            <PropertyTypeCard
              icon="Hotel"
              name="type"
              value="Hotel"
              defaultChecked={property.type === "Hotel"}
            >
              Hotel
            </PropertyTypeCard>
          </div>
        </div>

        {/* NAME */}
        <div>
          <label htmlFor="name" className="mb-3 block text-lg font-semibold">
            Name
          </label>

          <input
            type="text"
            placeholder="Property name"
            name="name"
            defaultValue={property.name}
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
            placeholder="Property description"
            name="description"
            defaultValue={property.description}
            className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.description ? "border-red-600" : ""}`}
          />
          <p className="text-red-600">{errors.description?.[0]}</p>
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="mb-3 block text-lg font-semibold">
            Address
          </label>

          <input
            type="text"
            placeholder="Property address"
            name="address"
            defaultValue={property.address}
            className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.address ? "border-red-600" : ""}`}
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
              className="border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none"
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
              className="border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none"
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

      <div className="border-bg flex w-full flex-col gap-10 border-l-2 pl-10">
        {/* LOCATION */}
        <div>
          <label
            htmlFor="location"
            className="mb-3 block text-lg font-semibold"
          >
            Select Location
          </label>

          <MapPickerWrapper currLocation={property.location} />
        </div>

        {/* CONTACT */}
        <div>
          <label htmlFor="contact" className="mb-3 block text-lg font-semibold">
            Contact
          </label>

          <div className="flex gap-2">
            <div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Phone"
                name="contactPhone"
                defaultValue={property.contactPhone}
                className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.contactPhone ? "border-red-600" : ""}`}
              />
              <p className="text-red-600">{errors.contactPhone?.[0]}</p>
            </div>

            <div>
              <input
                type="email"
                inputMode="email"
                placeholder="Email (optional)"
                name="contactEmail"
                defaultValue={
                  property?.contactEmail ? property.contactEmail : ""
                }
                className={`border-bg focus:ring-utell-yellow w-full rounded-md border-2 px-4 py-2 focus:ring-2 focus:outline-none ${errors.contactEmail ? "border-red-600" : ""}`}
              />
              <p className="text-red-600">{errors.contactEmail?.[0]}</p>
            </div>

            <input type="hidden" name="propertyId" value={property.id} />
          </div>
        </div>
      </div>

      <div className="border-bg flex w-full flex-col gap-10 border-l-2 pl-10">
        {/* PHOTOS */}
        <PhotoUpload
          prefix={`property-images/${property.id}`}
          currImages={currImages}
        />
        <p className="text-red-600">{errors.images?.[0]}</p>

        <FormSubmitButton>Update Property</FormSubmitButton>
      </div>
    </form>
  );
}
