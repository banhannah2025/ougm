"use client";

import { StepForm } from "@/components/apply/StepForm";
import { loadAllSteps } from "@/lib/apply-storage";

const dailyLivingOptions = [
  "Paying rent/utilities",
  "Lease compliance",
  "Housekeeping",
  "Money management",
  "Driving/using public transportation",
  "Arranging apartment repairs",
  "Use of mental health services",
  "Securing/maintaining benefits",
  "Meal preparation",
  "Shopping for food and other necessities",
  "Taking medication as prescribed or instructed",
  "Filling prescriptions",
  "Socialization",
  "Hygiene",
  "Other",
  "None",
];

export default function DailyLivingCard() {
  const stepId = "dailyLiving";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Daily Living</h1>
          <p className="text-sm text-muted-foreground">
            Tell us where you may need support with day-to-day activities.
          </p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-27"
          primaryLabel="Submit"
          validate={(data) => {
            const selections = data.dailyLiving;
            const hasSelection =
              Array.isArray(selections) ? selections.length > 0 : typeof selections === "string";
            if (!hasSelection) return "Please select at least one option.";
            if (
              (Array.isArray(selections) && selections.includes("other")) ||
              selections === "other"
            ) {
              if (!data.dailyLivingOther) return 'Please explain the "Other" selection.';
            }
            return null;
          }}
          onFinalSubmit={async () => {
            const payload = loadAllSteps();
            const res = await fetch("/api/apply/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ submittedAt: new Date().toISOString(), application: payload }),
            });
            if (!res.ok) {
              const json = await res.json().catch(() => ({}));
              throw new Error(json.error || "Failed to submit application.");
            }
          }}
        >
          {({ stepData }) => {
            const storedSelections = stepData.dailyLiving;
            const selectedValues = Array.isArray(storedSelections)
              ? storedSelections.map(String)
              : typeof storedSelections === "string"
                ? [storedSelections]
                : [];
            return (
              <>
                <section className="space-y-3">
                  <h2 className="text-sm font-semibold text-foreground">
                    Do you have difficulty with any of the following areas of daily living? (Check all
                    that apply)
                  </h2>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {dailyLivingOptions.map((item) => (
                      <label key={item} className="flex items-center gap-2 text-sm text-foreground">
                        <input
                          type="checkbox"
                          name="dailyLiving"
                          value={item.toLowerCase()}
                          required={dailyLivingOptions.indexOf(item) === 0}
                          defaultChecked={selectedValues.includes(item.toLowerCase())}
                          className="h-4 w-4 accent-primary"
                        />
                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </section>

                <div className="space-y-2">
                  <label htmlFor="dailyLivingOther" className="text-sm font-medium text-foreground">
                    If "Other", please explain
                  </label>
                  <textarea
                    id="dailyLivingOther"
                    name="dailyLivingOther"
                    rows={3}
                    placeholder="Describe additional areas where you need support"
                    defaultValue={(stepData.dailyLivingOther as string) || ""}
                    className="w-full rounded-xl border border-border/70 bg-background/70 px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </>
            );
          }}
        </StepForm>
      </div>
    </main>
  );
}
