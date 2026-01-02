"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function CurfewQuietTimesCard() {
  const stepId = "curfewQuietTimes";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Curfew and Quiet Times</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Unless permission is previously granted by Camp Staff, all Program Members will be in their respective Tiny
            House by 10:00 PM.
          </p>
          <p>
            Quiet times are observed from 10PM to 7AM. Without prior permission, residents will not be allowed to stay
            somewhere else over night while being in the Camp Mercy program and having a house assigned to them.
          </p>
          <p>
            If there is an emergency situation, this will be looked at on a case by case. There will be no traffic in and
            out of the Camp during scheduled curfew times. Except for use of the portable toilets, all Program Members
            are required to be in their Tiny House by curfew and remain on the property until 7:00AM unless leaving is
            directly related to a work schedule, then it can be pre-approved by Camp Staff on a case by case basis.
          </p>
          <p>
            If you leave after curfew, you will be subject to disciplinary action which may result in no longer being
            allowed to reside in Camp Mercy.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-6"
          nextHref="/apply/page-8"
          validate={(data) =>
            !data.ackCurfewQuietTimes
              ? "Please acknowledge the curfew and quiet times requirements."
              : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackCurfewQuietTimes"
                  required
                  defaultChecked={Boolean(stepData.ackCurfewQuietTimes)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  I understand the curfew and quite times requirements and agree to follow and respect these
                  requirements.
                </span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
