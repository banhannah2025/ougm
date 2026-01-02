"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function GeneralSafetySecurityCard() {
  const stepId = "generalSafety";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">General Safety and Security</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>Inform management if there are any suspicious persons or activities on or near Mission property.</p>
          <p>
            The Mission reserves the right to have Camp Staff search personal belongings of any Program Member if there is
            reason to believe that the Program Member is transporting items prohibited by this agreement.
          </p>
          <p>Any Program Member sneaking persons into their Tiny House may be evicted.</p>
          <p>Only electric heat provided by the Mission may be used in the Tiny House. Keep all items away from the heaters.</p>
          <p>
            <b>Do not disable smoke alarms.</b>
          </p>
          <p>
            <b>The burning of candles is strictly prohibited:</b> the fire danger is too great.
          </p>
          <p>
            Improper use or negligence that causes damage to any Mission property may result in eviction and / or the Program
            Member having to pay for repairs.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-9"
          nextHref="/apply/page-11"
          validate={(data) =>
            !data.ackGeneralSafety ? "Please acknowledge the general safety and security requirements." : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackGeneralSafety"
                  required
                  defaultChecked={Boolean(stepData.ackGeneralSafety)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand the requirements of general safety and security and agree to follow those requirements.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
