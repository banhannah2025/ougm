"use client";

import { InputField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

export default function EmergencyContactCard() {
  const stepId = "emergencyContact";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Emergency Contact</h1>
          <p className="text-sm text-muted-foreground">Who should we reach in case of an emergency?</p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-19"
          nextHref="/apply/page-21"
          validate={(data) => {
            const required = ["emergencyContactName", "emergencyContactRelationship", "emergencyContactPhone"];
            const missing = required.find((field) => !data[field]);
            if (missing) return "Please complete all emergency contact fields.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  id="emergencyContactName"
                  label="Emergency contact name"
                  required
                  defaultValue={(stepData.emergencyContactName as string) || ""}
                />
                <InputField
                  id="emergencyContactRelationship"
                  label="Relationship to applicant"
                  required
                  defaultValue={(stepData.emergencyContactRelationship as string) || ""}
                />
              </div>
              <InputField
                id="emergencyContactPhone"
                label="Emergency contact phone number"
                type="tel"
                required
                defaultValue={(stepData.emergencyContactPhone as string) || ""}
              />
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
