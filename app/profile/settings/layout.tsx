import SettingsNav from "@/app/_components/SettingsNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-bg-light flex p-8 rounded-2xl">
      <SettingsNav />

      <div className="flex flex-col p-5 bg-bg-light border-3 border-bg rounded-tr-lg rounded-br-lg flex-1">
        {children}
      </div>
    </div>
  );
}
