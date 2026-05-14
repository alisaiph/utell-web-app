export default async function TopBar() {
  return (
    <header className="bg-bg-light fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between px-4 md:hidden">
      <span className="text-xl font-bold text-[#FCBF49]">UTELL</span>
      <input
        className="bg-bg-dark w-48 rounded-full px-4 py-2 text-sm"
        placeholder="Search…"
      />
      <div className="relative h-9 w-9 overflow-hidden rounded-full">
        {/* Avatar or login icon */}
      </div>
    </header>
  );
}
