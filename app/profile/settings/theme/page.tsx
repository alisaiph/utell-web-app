export default function page() {
  return (
    <div className="flex flex-col gap-2">
      <p>Theme</p>
      <select className="p-2 border-2 border-background-secondary rounded-lg">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
      <hr className="border-0 h-0.5 bg-background-secondary" />
    </div>
  );
}
