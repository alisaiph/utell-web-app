import { ReactNode } from "react";

export default function SocialLoginBtn({
  children,
  handleClick,
}: {
  children: ReactNode;
  handleClick: () => void;
}) {
  return (
    <button
      className="bg-white hover:bg-background-secondary border border-utell-laccent transition-colors rounded-lg w-full py-4 px-20 text-md font-semibold cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
