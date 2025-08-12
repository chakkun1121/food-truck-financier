"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const ALLOWED_COLORS = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "stone",
  "neutral",
  "zinc",
  "gray",
  "slate"
] as const;

type AllowedColor = (typeof ALLOWED_COLORS)[number];

const colorClasses: Record<AllowedColor, string> = {
  red: "bg-red-500 hover:bg-red-600",
  orange: "bg-orange-500 hover:bg-orange-600",
  amber: "bg-amber-500 hover:bg-amber-600",
  yellow: "bg-yellow-500 hover:bg-yellow-600",
  lime: "bg-lime-500 hover:bg-lime-600",
  green: "bg-green-500 hover:bg-green-600",
  emerald: "bg-emerald-500 hover:bg-emerald-600",
  teal: "bg-teal-500 hover:bg-teal-600",
  cyan: "bg-cyan-500 hover:bg-cyan-600",
  sky: "bg-sky-500 hover:bg-sky-600",
  blue: "bg-blue-500 hover:bg-blue-600",
  indigo: "bg-indigo-500 hover:bg-indigo-600",
  violet: "bg-violet-500 hover:bg-violet-600",
  purple: "bg-purple-500 hover:bg-purple-600",
  fuchsia: "bg-fuchsia-500 hover:bg-fuchsia-600",
  pink: "bg-pink-500 hover:bg-pink-600",
  rose: "bg-rose-500 hover:bg-rose-600",
  stone: "bg-stone-500 hover:bg-stone-600",
  neutral: "bg-neutral-500 hover:bg-neutral-600",
  zinc: "bg-zinc-500 hover:bg-zinc-600",
  gray: "bg-gray-500 hover:bg-gray-600",
  slate: "bg-slate-500 hover:bg-slate-600"
};

interface RadioGroupProps
  extends Omit<
    React.ComponentProps<typeof RadioGroupPrimitive.Root>,
    "children"
  > {
  children?: React.ReactNode;
  showAllColors?: boolean;
}

function RadioGroup({
  className,
  children,
  showAllColors = false,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {showAllColors &&
        ALLOWED_COLORS.map(color => (
          <RadioGroupItem key={color} value={color} />
        ))}
      {children}
    </RadioGroupPrimitive.Root>
  );
}

interface RadioGroupItemProps
  extends Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, "value"> {
  value: AllowedColor;
}

function RadioGroupItem({ className, value, ...props }: RadioGroupItemProps) {
  if (!ALLOWED_COLORS.includes(value)) {
    console.error(
      `Invalid color value: ${value}. Must be one of: ${ALLOWED_COLORS.join(", ")}`
    );
    return null;
  }

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      value={value}
      className={cn(
        "relative size-8 rounded-full transition-all duration-200",
        "ring-offset-background ring-offset-2",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:ring-primary data-[state=checked]:ring-2",
        colorClasses[value],
        className
      )}
      title={value}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="absolute inset-0 flex items-center justify-center"
      >
        <Check className="size-5 text-white drop-shadow-md" strokeWidth={3} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { ALLOWED_COLORS, RadioGroup, RadioGroupItem };
export type { AllowedColor };
