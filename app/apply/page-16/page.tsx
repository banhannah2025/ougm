"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function DrugTestingCard() {
  const stepId = "drugTesting";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Drug Testing and Drug/Alcohol Use</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            <b>Camp Mercy is a drug and alcohol-Free Camp</b> - Drug or Alcohol possession or usage, including marijuana is
            strictly forbidden.
          </p>
          <p>
            Camp Program Members are required to submit to urine or saliva drug testing as a condition for being a Program
            Member. <b>Any violation of this rule can result in being discharged from the Program and eviction.</b>
          </p>
          <p>
            Additionally, no drug paraphernalia of any kind is allowed on the property. No Program Member shall be
            intoxicated or under the influence of drugs or alcohol on the property at any time.{" "}
            <b>
              The Olympia Union Gospel Mission reserves the right to request that a Program Members submit to a drug or
              alcohol screen at any time, with or without cause. Failure to comply with the request will be considered as
              if the screen had been positive and the Program Member will be discharged from the Program and evicted.
            </b>
          </p>
          <p>
            If a Program Member believes another Program Member is in possession of banned drugs or alcohol, or is under
            the influence of any substance at any time, Camp Staff must be contacted immediately.
          </p>
          <p>
            It is everyone&apos;s responsibility to keep Camp Mercy safe. Failure to notify Staff of another Program
            Member&apos;s use of substances can result in immediate discharge.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-15"
          nextHref="/apply/page-17"
          validate={(data) =>
            !data.ackDrugTesting ? "Please acknowledge the drug testing policies." : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackDrugTesting"
                  required
                  defaultChecked={Boolean(stepData.ackDrugTesting)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>Iunderstand and agree to adhere to the drug testing policies of OUGM.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
