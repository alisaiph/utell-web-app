import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";

export default function FormSubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center bg-utell-yellow hover:bg-utell-yellow/80 transition-colors text-white font-bold py-5 px-6 rounded-lg :outline-none focus:ring-2 focus:ring-utell-yellow cursor-pointer"
    >
      {pending ? <Spinner /> : children}
    </button>
  );
}
