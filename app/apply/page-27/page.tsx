"use client";

import { StepForm } from "@/components/apply/StepForm";

const childAgeOptions = [
  "Less than 1 year",
  "1 year old",
  "2 years old",
  "3 years old",
  "4 years old",
  "5 years old",
  "6 years old",
  "7 years old",
  "8 years old",
  "9 years old",
  "10 years old",
  "11 years old",
  "12 years old",
  "13 years old",
  "14 years old",
  "15 years old",
  "16 years old",
  "17 years old",
  "18 years old",
  "19 years old",
  "20 years old",
  "21 years old",
  "22 years old",
  "23 years old",
  "24 years old",
  "Over 24 years old",
];

export default function ChildrenCard() {
  const stepId = "children";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Children</h1>
          <p className="text-sm text-muted-foreground">Tell us about any children and child support.</p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-26"
          nextHref="/apply/page-28"
          validate={(data) => {
            if (!data.hasChildren) return "Please answer whether you have children.";
            if (data.hasChildren === "yes" && !data.childAges) return "Please select child age.";
            if (data.paysChildSupport === "yes" && !data.childSupportAmount) {
              return "Please provide the child support amount.";
            }
            if (data.paysChildSupport === "no" && !data.childSupportAmount) {
              // allow blank? We'll allow blank.
            }
            return null;
          }}
        >
          {({ stepData }) => (
            <>
              <SelectField
                id="hasChildren"
                label="Do you have any children?"
                required
                defaultValue={(stepData.hasChildren as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <SelectField
                id="childAges"
                label="If yes, how old?"
                required={stepData.hasChildren === "yes"}
                defaultValue={(stepData.childAges as string) || ""}
                options={[
                  { value: "", label: "Select age" },
                  ...childAgeOptions.map((age) => ({ value: age.toLowerCase(), label: age })),
                ]}
              />

              <SelectField
                id="paysChildSupport"
                label="Do you pay child support?"
                required
                defaultValue={(stepData.paysChildSupport as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <Field
                id="childSupportAmount"
                label="If yes, how much?"
                placeholder="Monthly amount"
                required={stepData.paysChildSupport === "yes"}
                defaultValue={(stepData.childSupportAmount as string) || ""}
              />
            </>
          )}
        </StepForm>
      </div>
    </main>
  );
}

function Field({
  id,
  label,
  placeholder,
  required,
  defaultValue,
}: {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  required,
  defaultValue,
}: {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        className="w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none"
        defaultValue={defaultValue || ""}
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
