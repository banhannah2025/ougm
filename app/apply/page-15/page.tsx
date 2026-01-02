"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function SmokingPolicyCard() {
  const stepId = "smokingPolicy";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Smoking Policy</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Smoking inside a Tiny House is grounds for immediate eviction. Do not smoke within 25 feet of doorways. Ensure
            all cigarettes are extinguished carefully for safety, make sure all butts are disposed of properly and not on
            the ground. Failure to meet any of these requirements may result in your privilege to smoke on the property
            being revoked. Smoking policy may change without notice at any time.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-14"
          nextHref="/apply/page-16"
          validate={(data) =>
            !data.ackSmokingPolicy ? "Please acknowledge the smoking policy." : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackSmokingPolicy"
                  required
                  defaultChecked={Boolean(stepData.ackSmokingPolicy)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand and agree to follow the smoking policy.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
