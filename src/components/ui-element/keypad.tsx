import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import BackSpaceIcon from "../icons/backspace";

export default function KeyPad({
  onChange,
  className,
  onSubmit,
}: {
  onChange?: (newValue: number) => void;
  className?: string;
  onSubmit?: (v: number) => void;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);
  return (
    <div className={cn("space-y-4", className)}>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit?.(value);
        }}
      >
        <Input
          className="text-center text-3xl"
          onChange={e => setValue(Number(e.target.value))}
          value={value}
          type="number"
          autoFocus
          placeholder="金額を入力"
        />
      </form>
      <div className="grid grid-rows-4 grid-cols-3 gap-4 justify-items-center">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0"].map(v => (
          <Button
            key={v}
            className="aspect-square w-24 h-24 text-xl"
            variant="outline"
            onClick={() => {
              setValue(Number("" + value + v));
            }}
          >
            {v}
          </Button>
        ))}
        <Button
          className="aspect-square w-24 h-24 text-xl"
          variant="outline"
          data-testid="backspace"
          onClick={() => {
            setValue(Number(("" + value).slice(0, -1)));
          }}
        >
          <BackSpaceIcon variant="outline" className="w-1/2 h-1/2" />
        </Button>
      </div>
    </div>
  );
}
