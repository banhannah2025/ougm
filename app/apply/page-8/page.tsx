"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function RestrictedItemsCard() {
  const stepId = "restrictedItems";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Restricted Personal Items</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            <b>Weapons of any kind are prohibited.</b> If the client declares possession of a weapon up front, the
            Mission will make a good faith effort to securely store the weapon when the safety of Mission staff will not
            be compromised.
          </p>
          <p>
            <b>Possession of any items of this sort may result in immediate eviction.</b>{" "}
            <b>No pornography of any kind will be allowed on the property.</b>
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-7"
          nextHref="/apply/page-9"
          validate={(data) =>
            !data.ackRestrictedItems
              ? "Please acknowledge the restricted items requirements."
              : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackRestrictedItems"
                  required
                  defaultChecked={Boolean(stepData.ackRestrictedItems)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  I understand the restricted items requirements and agree to follow said requirements.
                </span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
