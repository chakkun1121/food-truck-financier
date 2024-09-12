import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import BackSpaceIcon from "../icons/backspace";
import { Button } from "../ui/button";

export default function KeyPad({
  onChange,
  className,
  onSubmit
}: {
  onChange?: (newValue: number) => void;
  className?: string;
  onSubmit?: (v: number) => void;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);
  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case "Backspace":
          setValue(Number(("" + value).slice(0, -1)));
          break;
        case "Enter":
          onSubmit?.(value);
          break;
        default:
          const v = Number(e.key);
          if (!isNaN(v)) {
            setValue(Number("" + value + v));
          }
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [onSubmit, value]);
  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded border text-center text-3xl">{value}</div>
      <div className="grid grid-cols-3 grid-rows-4 justify-items-center gap-4">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"].map(v => (
          <Button
            key={v}
            className="aspect-square h-24 text-xl"
            variant="outline"
            onClick={() => {
              setValue(Number("" + value + v));
            }}
          >
            {v}
          </Button>
        ))}
        <Button
          className="aspect-square h-24 text-xl"
          variant="outline"
          data-testid="backspace"
          onClick={() => {
            setValue(Number(("" + value).slice(0, -1)));
          }}
        >
          <BackSpaceIcon variant="outline" className="h-1/2 w-1/2" />
        </Button>
      </div>
    </div>
  );
}
