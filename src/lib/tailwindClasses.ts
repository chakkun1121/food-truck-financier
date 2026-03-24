import { TailwindColorType } from "@/types/stallInfo";
// Because Tailwind CSS does not support dynamic class names, we need to map our color types to actual Tailwind CSS classes. These functions will help us do that.

// --- Border Classes ---

export function colorToBorder100Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/10";
    case "red":
      return "border-red-100";
    case "yellow":
      return "border-yellow-100";
    case "lime":
      return "border-lime-100";
    case "green":
      return "border-green-100";
    case "emerald":
      return "border-emerald-100";
    case "teal":
      return "border-teal-100";
    case "cyan":
      return "border-cyan-100";
    case "sky":
      return "border-sky-100";
    case "blue":
      return "border-blue-100";
    case "violet":
      return "border-violet-100";
    case "purple":
      return "border-purple-100";
    case "fuchsia":
      return "border-fuchsia-100";
    case "pink":
      return "border-pink-100";
    case "rose":
      return "border-rose-100";
    case "stone":
      return "border-stone-100";
    case "neutral":
      return "border-neutral-100";
    case "zinc":
      return "border-zinc-100";
    case "gray":
      return "border-gray-100";
    case "slate":
      return "border-slate-100";
  }
}

export function colorToBorder200Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/20";
    case "red":
      return "border-red-200";
    case "yellow":
      return "border-yellow-200";
    case "lime":
      return "border-lime-200";
    case "green":
      return "border-green-200";
    case "emerald":
      return "border-emerald-200";
    case "teal":
      return "border-teal-200";
    case "cyan":
      return "border-cyan-200";
    case "sky":
      return "border-sky-200";
    case "blue":
      return "border-blue-200";
    case "violet":
      return "border-violet-200";
    case "purple":
      return "border-purple-200";
    case "fuchsia":
      return "border-fuchsia-200";
    case "pink":
      return "border-pink-200";
    case "rose":
      return "border-rose-200";
    case "stone":
      return "border-stone-200";
    case "neutral":
      return "border-neutral-200";
    case "zinc":
      return "border-zinc-200";
    case "gray":
      return "border-gray-200";
    case "slate":
      return "border-slate-200";
  }
}

export function colorToBorder300Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/30";
    case "red":
      return "border-red-300";
    case "yellow":
      return "border-yellow-300";
    case "lime":
      return "border-lime-300";
    case "green":
      return "border-green-300";
    case "emerald":
      return "border-emerald-300";
    case "teal":
      return "border-teal-300";
    case "cyan":
      return "border-cyan-300";
    case "sky":
      return "border-sky-300";
    case "blue":
      return "border-blue-300";
    case "violet":
      return "border-violet-300";
    case "purple":
      return "border-purple-300";
    case "fuchsia":
      return "border-fuchsia-300";
    case "pink":
      return "border-pink-300";
    case "rose":
      return "border-rose-300";
    case "stone":
      return "border-stone-300";
    case "neutral":
      return "border-neutral-300";
    case "zinc":
      return "border-zinc-300";
    case "gray":
      return "border-gray-300";
    case "slate":
      return "border-slate-300";
  }
}

export function colorToBorder400Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/40";
    case "red":
      return "border-red-400";
    case "yellow":
      return "border-yellow-400";
    case "lime":
      return "border-lime-400";
    case "green":
      return "border-green-400";
    case "emerald":
      return "border-emerald-400";
    case "teal":
      return "border-teal-400";
    case "cyan":
      return "border-cyan-400";
    case "sky":
      return "border-sky-400";
    case "blue":
      return "border-blue-400";
    case "violet":
      return "border-violet-400";
    case "purple":
      return "border-purple-400";
    case "fuchsia":
      return "border-fuchsia-400";
    case "pink":
      return "border-pink-400";
    case "rose":
      return "border-rose-400";
    case "stone":
      return "border-stone-400";
    case "neutral":
      return "border-neutral-400";
    case "zinc":
      return "border-zinc-400";
    case "gray":
      return "border-gray-400";
    case "slate":
      return "border-slate-400";
  }
}

export function colorToBorder500Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary";
    case "red":
      return "border-red-500";
    case "yellow":
      return "border-yellow-500";
    case "lime":
      return "border-lime-500";
    case "green":
      return "border-green-500";
    case "emerald":
      return "border-emerald-500";
    case "teal":
      return "border-teal-500";
    case "cyan":
      return "border-cyan-500";
    case "sky":
      return "border-sky-500";
    case "blue":
      return "border-blue-500";
    case "violet":
      return "border-violet-500";
    case "purple":
      return "border-purple-500";
    case "fuchsia":
      return "border-fuchsia-500";
    case "pink":
      return "border-pink-500";
    case "rose":
      return "border-rose-500";
    case "stone":
      return "border-stone-500";
    case "neutral":
      return "border-neutral-500";
    case "zinc":
      return "border-zinc-500";
    case "gray":
      return "border-gray-500";
    case "slate":
      return "border-slate-500";
  }
}

export function colorToBorder600Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/60";
    case "red":
      return "border-red-600";
    case "yellow":
      return "border-yellow-600";
    case "lime":
      return "border-lime-600";
    case "green":
      return "border-green-600";
    case "emerald":
      return "border-emerald-600";
    case "teal":
      return "border-teal-600";
    case "cyan":
      return "border-cyan-600";
    case "sky":
      return "border-sky-600";
    case "blue":
      return "border-blue-600";
    case "violet":
      return "border-violet-600";
    case "purple":
      return "border-purple-600";
    case "fuchsia":
      return "border-fuchsia-600";
    case "pink":
      return "border-pink-600";
    case "rose":
      return "border-rose-600";
    case "stone":
      return "border-stone-600";
    case "neutral":
      return "border-neutral-600";
    case "zinc":
      return "border-zinc-600";
    case "gray":
      return "border-gray-600";
    case "slate":
      return "border-slate-600";
  }
}

export function colorToBorder700Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/70";
    case "red":
      return "border-red-700";
    case "yellow":
      return "border-yellow-700";
    case "lime":
      return "border-lime-700";
    case "green":
      return "border-green-700";
    case "emerald":
      return "border-emerald-700";
    case "teal":
      return "border-teal-700";
    case "cyan":
      return "border-cyan-700";
    case "sky":
      return "border-sky-700";
    case "blue":
      return "border-blue-700";
    case "violet":
      return "border-violet-700";
    case "purple":
      return "border-purple-700";
    case "fuchsia":
      return "border-fuchsia-700";
    case "pink":
      return "border-pink-700";
    case "rose":
      return "border-rose-700";
    case "stone":
      return "border-stone-700";
    case "neutral":
      return "border-neutral-700";
    case "zinc":
      return "border-zinc-700";
    case "gray":
      return "border-gray-700";
    case "slate":
      return "border-slate-700";
  }
}

export function colorToBorder800Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/80";
    case "red":
      return "border-red-800";
    case "yellow":
      return "border-yellow-800";
    case "lime":
      return "border-lime-800";
    case "green":
      return "border-green-800";
    case "emerald":
      return "border-emerald-800";
    case "teal":
      return "border-teal-800";
    case "cyan":
      return "border-cyan-800";
    case "sky":
      return "border-sky-800";
    case "blue":
      return "border-blue-800";
    case "violet":
      return "border-violet-800";
    case "purple":
      return "border-purple-800";
    case "fuchsia":
      return "border-fuchsia-800";
    case "pink":
      return "border-pink-800";
    case "rose":
      return "border-rose-800";
    case "stone":
      return "border-stone-800";
    case "neutral":
      return "border-neutral-800";
    case "zinc":
      return "border-zinc-800";
    case "gray":
      return "border-gray-800";
    case "slate":
      return "border-slate-800";
  }
}

export function colorToBorder900Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "border-primary/90";
    case "red":
      return "border-red-900";
    case "yellow":
      return "border-yellow-900";
    case "lime":
      return "border-lime-900";
    case "green":
      return "border-green-900";
    case "emerald":
      return "border-emerald-900";
    case "teal":
      return "border-teal-900";
    case "cyan":
      return "border-cyan-900";
    case "sky":
      return "border-sky-900";
    case "blue":
      return "border-blue-900";
    case "violet":
      return "border-violet-900";
    case "purple":
      return "border-purple-900";
    case "fuchsia":
      return "border-fuchsia-900";
    case "pink":
      return "border-pink-900";
    case "rose":
      return "border-rose-900";
    case "stone":
      return "border-stone-900";
    case "neutral":
      return "border-neutral-900";
    case "zinc":
      return "border-zinc-900";
    case "gray":
      return "border-gray-900";
    case "slate":
      return "border-slate-900";
  }
}

// --- Background Classes ---

export function colorToBg100Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/10";
    case "red":
      return "bg-red-100";
    case "yellow":
      return "bg-yellow-100";
    case "lime":
      return "bg-lime-100";
    case "green":
      return "bg-green-100";
    case "emerald":
      return "bg-emerald-100";
    case "teal":
      return "bg-teal-100";
    case "cyan":
      return "bg-cyan-100";
    case "sky":
      return "bg-sky-100";
    case "blue":
      return "bg-blue-100";
    case "violet":
      return "bg-violet-100";
    case "purple":
      return "bg-purple-100";
    case "fuchsia":
      return "bg-fuchsia-100";
    case "pink":
      return "bg-pink-100";
    case "rose":
      return "bg-rose-100";
    case "stone":
      return "bg-stone-100";
    case "neutral":
      return "bg-neutral-100";
    case "zinc":
      return "bg-zinc-100";
    case "gray":
      return "bg-gray-100";
    case "slate":
      return "bg-slate-100";
  }
}

export function colorToBg200Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/20";
    case "red":
      return "bg-red-200";
    case "yellow":
      return "bg-yellow-200";
    case "lime":
      return "bg-lime-200";
    case "green":
      return "bg-green-200";
    case "emerald":
      return "bg-emerald-200";
    case "teal":
      return "bg-teal-200";
    case "cyan":
      return "bg-cyan-200";
    case "sky":
      return "bg-sky-200";
    case "blue":
      return "bg-blue-200";
    case "violet":
      return "bg-violet-200";
    case "purple":
      return "bg-purple-200";
    case "fuchsia":
      return "bg-fuchsia-200";
    case "pink":
      return "bg-pink-200";
    case "rose":
      return "bg-rose-200";
    case "stone":
      return "bg-stone-200";
    case "neutral":
      return "bg-neutral-200";
    case "zinc":
      return "bg-zinc-200";
    case "gray":
      return "bg-gray-200";
    case "slate":
      return "bg-slate-200";
  }
}

export function colorToBg300Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/30";
    case "red":
      return "bg-red-300";
    case "yellow":
      return "bg-yellow-300";
    case "lime":
      return "bg-lime-300";
    case "green":
      return "bg-green-300";
    case "emerald":
      return "bg-emerald-300";
    case "teal":
      return "bg-teal-300";
    case "cyan":
      return "bg-cyan-300";
    case "sky":
      return "bg-sky-300";
    case "blue":
      return "bg-blue-300";
    case "violet":
      return "bg-violet-300";
    case "purple":
      return "bg-purple-300";
    case "fuchsia":
      return "bg-fuchsia-300";
    case "pink":
      return "bg-pink-300";
    case "rose":
      return "bg-rose-300";
    case "stone":
      return "bg-stone-300";
    case "neutral":
      return "bg-neutral-300";
    case "zinc":
      return "bg-zinc-300";
    case "gray":
      return "bg-gray-300";
    case "slate":
      return "bg-slate-300";
  }
}

export function colorToBg400Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/40";
    case "red":
      return "bg-red-400";
    case "yellow":
      return "bg-yellow-400";
    case "lime":
      return "bg-lime-400";
    case "green":
      return "bg-green-400";
    case "emerald":
      return "bg-emerald-400";
    case "teal":
      return "bg-teal-400";
    case "cyan":
      return "bg-cyan-400";
    case "sky":
      return "bg-sky-400";
    case "blue":
      return "bg-blue-400";
    case "violet":
      return "bg-violet-400";
    case "purple":
      return "bg-purple-400";
    case "fuchsia":
      return "bg-fuchsia-400";
    case "pink":
      return "bg-pink-400";
    case "rose":
      return "bg-rose-400";
    case "stone":
      return "bg-stone-400";
    case "neutral":
      return "bg-neutral-400";
    case "zinc":
      return "bg-zinc-400";
    case "gray":
      return "bg-gray-400";
    case "slate":
      return "bg-slate-400";
  }
}

export function colorToBg500Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary";
    case "red":
      return "bg-red-500";
    case "yellow":
      return "bg-yellow-500";
    case "lime":
      return "bg-lime-500";
    case "green":
      return "bg-green-500";
    case "emerald":
      return "bg-emerald-500";
    case "teal":
      return "bg-teal-500";
    case "cyan":
      return "bg-cyan-500";
    case "sky":
      return "bg-sky-500";
    case "blue":
      return "bg-blue-500";
    case "violet":
      return "bg-violet-500";
    case "purple":
      return "bg-purple-500";
    case "fuchsia":
      return "bg-fuchsia-500";
    case "pink":
      return "bg-pink-500";
    case "rose":
      return "bg-rose-500";
    case "stone":
      return "bg-stone-500";
    case "neutral":
      return "bg-neutral-500";
    case "zinc":
      return "bg-zinc-500";
    case "gray":
      return "bg-gray-500";
    case "slate":
      return "bg-slate-500";
  }
}

export function colorToBg600Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/60";
    case "red":
      return "bg-red-600";
    case "yellow":
      return "bg-yellow-600";
    case "lime":
      return "bg-lime-600";
    case "green":
      return "bg-green-600";
    case "emerald":
      return "bg-emerald-600";
    case "teal":
      return "bg-teal-600";
    case "cyan":
      return "bg-cyan-600";
    case "sky":
      return "bg-sky-600";
    case "blue":
      return "bg-blue-600";
    case "violet":
      return "bg-violet-600";
    case "purple":
      return "bg-purple-600";
    case "fuchsia":
      return "bg-fuchsia-600";
    case "pink":
      return "bg-pink-600";
    case "rose":
      return "bg-rose-600";
    case "stone":
      return "bg-stone-600";
    case "neutral":
      return "bg-neutral-600";
    case "zinc":
      return "bg-zinc-600";
    case "gray":
      return "bg-gray-600";
    case "slate":
      return "bg-slate-600";
  }
}

export function colorToBg700Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/70";
    case "red":
      return "bg-red-700";
    case "yellow":
      return "bg-yellow-700";
    case "lime":
      return "bg-lime-700";
    case "green":
      return "bg-green-700";
    case "emerald":
      return "bg-emerald-700";
    case "teal":
      return "bg-teal-700";
    case "cyan":
      return "bg-cyan-700";
    case "sky":
      return "bg-sky-700";
    case "blue":
      return "bg-blue-700";
    case "violet":
      return "bg-violet-700";
    case "purple":
      return "bg-purple-700";
    case "fuchsia":
      return "bg-fuchsia-700";
    case "pink":
      return "bg-pink-700";
    case "rose":
      return "bg-rose-700";
    case "stone":
      return "bg-stone-700";
    case "neutral":
      return "bg-neutral-700";
    case "zinc":
      return "bg-zinc-700";
    case "gray":
      return "bg-gray-700";
    case "slate":
      return "bg-slate-700";
  }
}

export function colorToBg800Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/80";
    case "red":
      return "bg-red-800";
    case "yellow":
      return "bg-yellow-800";
    case "lime":
      return "bg-lime-800";
    case "green":
      return "bg-green-800";
    case "emerald":
      return "bg-emerald-800";
    case "teal":
      return "bg-teal-800";
    case "cyan":
      return "bg-cyan-800";
    case "sky":
      return "bg-sky-800";
    case "blue":
      return "bg-blue-800";
    case "violet":
      return "bg-violet-800";
    case "purple":
      return "bg-purple-800";
    case "fuchsia":
      return "bg-fuchsia-800";
    case "pink":
      return "bg-pink-800";
    case "rose":
      return "bg-rose-800";
    case "stone":
      return "bg-stone-800";
    case "neutral":
      return "bg-neutral-800";
    case "zinc":
      return "bg-zinc-800";
    case "gray":
      return "bg-gray-800";
    case "slate":
      return "bg-slate-800";
  }
}

export function colorToBg900Class(color: TailwindColorType | "primary") {
  switch (color) {
    case "primary":
      return "bg-primary/90";
    case "red":
      return "bg-red-900";
    case "yellow":
      return "bg-yellow-900";
    case "lime":
      return "bg-lime-900";
    case "green":
      return "bg-green-900";
    case "emerald":
      return "bg-emerald-900";
    case "teal":
      return "bg-teal-900";
    case "cyan":
      return "bg-cyan-900";
    case "sky":
      return "bg-sky-900";
    case "blue":
      return "bg-blue-900";
    case "violet":
      return "bg-violet-900";
    case "purple":
      return "bg-purple-900";
    case "fuchsia":
      return "bg-fuchsia-900";
    case "pink":
      return "bg-pink-900";
    case "rose":
      return "bg-rose-900";
    case "stone":
      return "bg-stone-900";
    case "neutral":
      return "bg-neutral-900";
    case "zinc":
      return "bg-zinc-900";
    case "gray":
      return "bg-gray-900";
    case "slate":
      return "bg-slate-900";
  }
}
