"use client";

import { CheckboxList, SelectField, TextareaField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

const relationshipStatuses = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Separated", value: "separated" },
  { label: "Divorced", value: "divorced" },
  { label: "Boyfriend/Girlfriend", value: "boyfriend/girlfriend" },
  { label: "Widowed", value: "widowed" },
];

export default function HousingBackgroundCard() {
  const stepId = "housingBackground";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Relationships & Housing Background</h1>
          <p className="text-sm text-muted-foreground">
            Provide your relationship status, safety history, and current housing situation.
          </p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-21"
          nextHref="/apply/page-23"
          validate={(data) => {
            const selections = data.relationshipStatus;
            const hasRelationship =
              Array.isArray(selections) ? selections.length > 0 : typeof selections === "string";
            if (!hasRelationship) return "Please select a relationship status.";
            const requiredSelects = [
              "domesticViolenceHistory",
              "veteranStatus",
              "housingSubsidy",
              "paidUtilities",
            ];
            const missingSelect = requiredSelects.find((field) => !data[field]);
            if (missingSelect) return "Please complete all required selections.";
            if (data.domesticViolenceHistory === "yes" && !data.domesticViolenceDetails) {
              return "Please describe domestic violence history.";
            }
            if (!data.supportiveFamily) return "Please list supportive family members.";
            if (!data.currentLivingCircumstances) return "Please describe current living circumstances.";
            if (!data.currentlyHomelessDuration) return "Please describe current homelessness status/duration.";
            if (!data.sleepLast30Nights) return "Please share where you slept the last 30 nights.";
            if (!data.rentalHistory) return "Please provide rental history details.";
            if (!data.evictionHistory) return "Please explain eviction history.";
            if (!data.reasonLeftPreviousHousing)
              return "Please share the reason for leaving previous housing.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-6">
              <section className="space-y-4">
                <h2 className="text-sm font-semibold text-foreground">Relationship status</h2>
                <CheckboxList
                  name="relationshipStatus"
                  options={relationshipStatuses}
                  stepData={stepData}
                  required
                />
              </section>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="domesticViolenceHistory"
                  label="Any current or past identified domestic violence issues?"
                  required
                  defaultValue={(stepData.domesticViolenceHistory as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  id="veteranStatus"
                  label="Are you a veteran?"
                  required
                  defaultValue={(stepData.veteranStatus as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>

              <TextareaField
                id="domesticViolenceDetails"
                label="If yes to domestic violence issues, please describe"
                placeholder="Briefly share context or any safety considerations"
                required={stepData.domesticViolenceHistory === "yes"}
                defaultValue={(stepData.domesticViolenceDetails as string) || ""}
              />

              <TextareaField
                id="supportiveFamily"
                label="Do you have any supportive family members? Who are they?"
                placeholder="List names and relationships"
                required
                defaultValue={(stepData.supportiveFamily as string) || ""}
              />

              <TextareaField
                id="currentLivingCircumstances"
                label="Current living circumstances"
                placeholder="Describe where you are staying right now"
                required
                defaultValue={(stepData.currentLivingCircumstances as string) || ""}
              />

              <TextareaField
                id="currentlyHomelessDuration"
                label="Are you currently homeless? If so, how long?"
                placeholder="Example: Yes, 6 months"
                required
                defaultValue={(stepData.currentlyHomelessDuration as string) || ""}
              />

              <TextareaField
                id="sleepLast30Nights"
                label="Where did you sleep for the last 30 nights?"
                placeholder="List locations or situations"
                required
                defaultValue={(stepData.sleepLast30Nights as string) || ""}
              />

              <SelectField
                id="housingSubsidy"
                label="Do you receive a housing subsidy?"
                required
                defaultValue={(stepData.housingSubsidy as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="rentalHistory"
                label="Have you ever had an apartment in your name and paid your own rent, or rented a room in the past 5 years? If so, list dates and rent amounts."
                placeholder="Include addresses, dates, and monthly rent"
                required
                defaultValue={(stepData.rentalHistory as string) || ""}
              />

              <SelectField
                id="paidUtilities"
                label="Have you ever paid utilities?"
                required
                defaultValue={(stepData.paidUtilities as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="evictionHistory"
                label="Have you ever been evicted? If so, please explain."
                placeholder="Provide dates, reasons, and outcomes"
                required
                defaultValue={(stepData.evictionHistory as string) || ""}
              />

              <TextareaField
                id="reasonLeftPreviousHousing"
                label="Reason for leaving previous housing situation"
                placeholder="Explain circumstances around your last move"
                required
                defaultValue={(stepData.reasonLeftPreviousHousing as string) || ""}
              />
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
