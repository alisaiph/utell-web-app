import SettingsNav from "@/app/_components/SettingsNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-light flex flex-col rounded-2xl p-4 md:flex-row md:p-8">
      <SettingsNav />

      <div className="bg-bg-light border-bg flex flex-1 flex-col rounded-br-lg rounded-bl-lg border-3 p-5 md:rounded-tr-lg md:rounded-bl-none">
        {children}
      </div>
    </div>
  );
}
