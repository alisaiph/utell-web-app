import PropertyTypeCard from "@/app/_components/PropertyTypeCard";
import { addPropertyAction } from "@/app/_lib/actions";
import { Image } from "lucide-react";
import MapPickerWrapper from "@/app/_components/MapPickerWrapper";
import PhotoUpload from "@/app/_components/PhotoUpload";

export default function page() {
  return (
    <div className="bg-bg-light flex flex-col gap-10 p-8 rounded-2xl">
      <h2 className="text-xl font-semibold">Add Property</h2>

      <form action={addPropertyAction} className="flex gap-10">
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
                value="guest-house"
                defaultChecked={true}
              >
                Guest House
              </PropertyTypeCard>
              <PropertyTypeCard icon="Building" name="type" value="apartment">
                Apartment
              </PropertyTypeCard>
              <PropertyTypeCard icon="Hotel" name="type" value="hotel">
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
              className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
            />
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
              className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
            />
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
              className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
            />

            <div className="flex gap-2">
              <select
                name="city"
                required
                className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              >
                <option value="male">Male</option>
                <option value="hulhumale">Hulhumale</option>
                <option value="vilingili">Vilingili</option>
              </select>
              <select
                name="area"
                required
                className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              >
                <option value="henveyru">Henveyru</option>
                <option value="galolhu">Galolhu</option>
                <option value="mahchangoalhi">Mahchangoalhi</option>
                <option value="maafannu">Maafannu</option>
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
              <input
                type="text"
                placeholder="Phone"
                name="contactPhone"
                required
                className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              />
              <input
                type="email"
                placeholder="Email"
                name="contactEmail"
                className="border-2 border-bg rounded-md w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-utell-yellow"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 border-l-2 border-bg pl-10 w-full">
          {/* PHOTOS */}
          <PhotoUpload />

          <button
            type="submit"
            className="bg-utell-yellow hover:bg-utell-yellow/80 transition-colors text-white font-bold py-4 px-6 rounded-lg :outline-none focus:ring-2 focus:ring-utell-yellow cursor-pointer"
          >
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
}
