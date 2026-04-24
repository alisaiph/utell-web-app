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
      className="bg-white border-2 border-bg-dark rounded-full p-4 cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
