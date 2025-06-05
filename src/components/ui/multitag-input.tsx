import * as React from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import clsx from "clsx";

interface MultiTagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

export const MultiTagInput: React.FC<MultiTagInputProps> = ({
  value,
  onChange,
  placeholder = "Add a tag...",
  disabled = false,
  className,
}) => {
  const [input, setInput] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === "," || e.key === "Tab") &&
      input.trim()
    ) {
      e.preventDefault();
      if (!value?.includes(input.trim())) {
        onChange([...(value || []), input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && value.length) {
      onChange(value?.slice(0, -1));
    }
  };

  const handleRemoveTag = (idx: number) => {
    if (onChange) {
      onChange(value?.filter((_, i) => i !== idx));
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-2 border rounded-md px-2 py-1 min-h-[42px] bg-background focus-within:ring-2 focus-within:ring-ring transition",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {value.map((tag, idx) => (
        <span
          key={tag + idx}
          className="flex items-center bg-muted text-muted-foreground rounded px-2 py-1 text-sm mr-1 mb-1"
        >
          {tag}
          <button
            type="button"
            onClick={() => handleRemoveTag(idx)}
            className="ml-1 hover:text-destructive focus:outline-none"
            tabIndex={-1}
            aria-label={`Remove ${tag}`}
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}
      <Input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 border-none shadow-none focus:ring-0 focus-visible:ring-0 bg-transparent p-0 min-w-[100px]"
      />
    </div>
  );
};
