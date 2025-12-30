import SettingsNav from "@/app/_components/SettingsNav";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white flex p-8 rounded-2xl">
      <SettingsNav />

      <div className="flex flex-col p-5 bg-white border-3 border-background-secondary rounded-tr-lg rounded-br-lg flex-1">
        {children}
      </div>
    </div>
  );
}
