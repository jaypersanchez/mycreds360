import { cn } from "@/lib/utils";

export default function WidgetBox({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "flex rounded-xl p-4 border border-neutral-300/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
