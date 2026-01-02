"use client";

type BaseProps = {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
};

export function InputField({
  id,
  label,
  type = "text",
  placeholder,
  required,
  defaultValue,
  inputMode,
}: BaseProps & {
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        inputMode={inputMode}
        className="w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}

export function TextareaField({
  id,
  label,
  placeholder,
  required,
  defaultValue,
  rows = 3,
}: BaseProps & { placeholder?: string; defaultValue?: string; rows?: number }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}

export function SelectField({
  id,
  label,
  options,
  required,
  defaultValue,
}: BaseProps & { options: { value: string; label: string }[]; defaultValue?: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={defaultValue || ""}
        className="w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxList({
  name,
  options,
  stepData,
  required,
  columns = 2,
}: {
  name: string;
  options: { label: string; value: string }[];
  stepData: Record<string, unknown>;
  required?: boolean;
  columns?: 1 | 2;
}) {
  const current = stepData[name];
  const selected = Array.isArray(current)
    ? current.map(String)
    : typeof current === "string"
      ? [current]
      : [];

  return (
    <div className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {options.map((opt, idx) => (
        <label key={opt.value} className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            name={name}
            value={opt.value}
            required={required && idx === 0}
            defaultChecked={selected.includes(opt.value)}
            className="h-4 w-4 accent-primary"
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
