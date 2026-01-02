"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function SecurityOfKeysCard() {
  const stepId = "securityKeys";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Security of Keys</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            No Program Member will allow their keys to Camp Mercy / Mission Property to leave their personal possession.
            This includes giving your keys to another to perform a task, such as retrieving a personal item from your Tiny
            House or loaning a key to the portable bathroom, or security gate.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-8"
          nextHref="/apply/page-10"
          validate={(data) =>
            !data.ackSecurityKeys ? "Please acknowledge security of keys requirements." : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackSecurityKeys"
                  required
                  defaultChecked={Boolean(stepData.ackSecurityKeys)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand the security of keys requirements and agree to follow.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
