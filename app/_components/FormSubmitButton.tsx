import { useFormStatus } from "react-dom";

export default function FormSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-utell-yellow hover:bg-utell-yellow/80 transition-colors text-white font-bold py-4 px-6 rounded-lg :outline-none focus:ring-2 focus:ring-utell-yellow cursor-pointer"
    >
      {pending ? "Adding..." : "Add Property"}
    </button>
  );
}
