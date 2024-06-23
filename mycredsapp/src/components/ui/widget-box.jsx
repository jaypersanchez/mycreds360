import { cn } from "@/lib/utils";

export default function WidgetBox({ children, className, ...props }) {
  return (
    <div className={cn("shadow-lg rounded-xl", className)} {...props}>
      {children}
    </div>
  );
}
