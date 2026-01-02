"use client";

import { InputField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

export default function ReferralAndDateCard() {
  const stepId = "referral";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Referral and Application Date</h1>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-17"
          nextHref="/apply/page-19"
          validate={(data) => {
            if (!data.heardAbout) return "Please tell us how you heard about Camp Mercy.";
            if (!data.applicationDate) return "Please provide the date of application.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-5">
              <InputField
                id="heardAbout"
                label="How did you hear about Camp Mercy?"
                placeholder="Friend, outreach, church, social media, etc."
                required
                defaultValue={(stepData.heardAbout as string) || ""}
              />
              <InputField
                id="applicationDate"
                label="Date of application"
                type="date"
                required
                defaultValue={(stepData.applicationDate as string) || ""}
              />
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
