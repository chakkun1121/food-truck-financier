import { cn } from "@/lib/utils";

export default function Loading({ className }: { className?: string }) {
  return <p className={cn("text-center", className)}>Loading...</p>;
}
