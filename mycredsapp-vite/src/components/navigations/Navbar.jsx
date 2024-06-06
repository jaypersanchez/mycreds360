import { cn } from "@/lib/utils";

export default function Navbar({ className }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex items-center px-10 min-h-20 bg-white border-b border-gray-300",
        className
      )}
    >
      <div className="h-6 w-6 bg-orange-400" />
    </header>
  );
}
