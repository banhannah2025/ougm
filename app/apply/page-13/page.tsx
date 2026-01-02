"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function AbandonmentCard() {
  const stepId = "abandonment";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Abandonment</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            If a Program Member is absent without approval from Camp Mercy overnight or for more than one day, they will
            be considered to have resigned from the Program and any personal property along with the Tiny House will be
            surrendered to the Camp Coordinator. An attempt will be made with the resident then emergency contact. If that
            is not satisfied any items left will then be donated or disposed of.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-12"
          nextHref="/apply/page-14"
          validate={(data) =>
            !data.ackAbandonment ? "Please acknowledge the abandonment policy." : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackAbandonment"
                  required
                  defaultChecked={Boolean(stepData.ackAbandonment)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand and agree to follow the requirements of non-abandonment.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
