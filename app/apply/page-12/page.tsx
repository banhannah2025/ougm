"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function OvernightAbsenceCard() {
  const stepId = "overnightAbsence";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Overnight Absence From the Property</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Except for emergency situations, Program Members will not be absent from the Property. The Camp Mercy
            Coordinator may approve exceptions on a case by case basis for valid reasons.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-11"
          nextHref="/apply/page-13"
          validate={(data) =>
            !data.ackOvernightAbsence
              ? "Please acknowledge the overnight absence requirements."
              : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackOvernightAbsence"
                  required
                  defaultChecked={Boolean(stepData.ackOvernightAbsence)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand and agree to follow the requirements of overnight absences from the property.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
