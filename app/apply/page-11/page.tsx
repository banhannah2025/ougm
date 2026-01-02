"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function PhysicalBoundariesCard() {
  const stepId = "physicalBoundaries";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Physical Boundaries</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            No Program Member is allowed into another Program Member&apos;s Tiny House without permission of Camp Staff.
            Camp Staff reserve the right to enter a Tiny House at any time to inspect the unit, make repairs, or conduct
            random house and curfew checks. Program Members are not permitted to change Tiny Houses unless directed by
            Camp Staff.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-10"
          nextHref="/apply/page-12"
          validate={(data) =>
            !data.ackPhysicalBoundaries
              ? "Please acknowledge the physical boundaries requirements."
              : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackPhysicalBoundaries"
                  required
                  defaultChecked={Boolean(stepData.ackPhysicalBoundaries)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand and agree to follow the requirements for respect of physical boundaries.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
