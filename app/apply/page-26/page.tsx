"use client";

import { InputField, SelectField, TextareaField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

export default function LegalIssuesCard() {
  const stepId = "legalIssues";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Legal Issues</h1>
          <p className="text-sm text-muted-foreground">
            Share any legal history, representation, and current court requirements.
          </p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-25"
          nextHref="/apply/page-27"
          validate={(data) => {
            const requiredSelects = ["legalSettlements", "priorArrests", "legalRepresentation", "onProbation"];
            const missingSelect = requiredSelects.find((field) => !data[field]);
            if (missingSelect) return "Please answer all legal yes/no questions.";

            if (data.legalSettlements === "yes" && !data.legalSettlementsDetails) {
              return "Please explain your settlements.";
            }
            if (data.priorArrests === "yes" && !data.priorArrestsDetails) {
              return "Please explain prior arrests/convictions/incarcerations.";
            }
            if (data.priorArrests === "yes" && !data.priorArrestsStatus) {
              return "Please provide the current status of prior arrests.";
            }
            if (!data.currentLegalIssues) return "Please explain any current legal issues (or state none).";
            if (!data.chargesAndCourtDates) return "Please list charges and any pending court dates.";
            if (data.legalRepresentation === "yes" && !data.legalRepresentationDetails) {
              return "Please list your legal representation or advocate.";
            }
            if (data.onProbation === "yes" && !data.probationOfficer) {
              return "Please provide your probation officer contact information.";
            }
            if (!data.probationTerms) return "Please list the terms of your probation.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-6">
              <SelectField
                id="legalSettlements"
                label="Do you have any settlements currently or pending?"
                required
                defaultValue={(stepData.legalSettlements as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
              <TextareaField
                id="legalSettlementsDetails"
                label='If "yes," please explain'
                placeholder="Type of settlement, amounts, status"
                required={stepData.legalSettlements === "yes"}
                defaultValue={(stepData.legalSettlementsDetails as string) || ""}
              />

              <SelectField
                id="priorArrests"
                label="Do you have any prior arrests, convictions or incarcerations?"
                required
                defaultValue={(stepData.priorArrests as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
              <TextareaField
                id="priorArrestsDetails"
                label='If "Yes," please explain'
                placeholder="Dates, locations, charges, sentences"
                required={stepData.priorArrests === "yes"}
                defaultValue={(stepData.priorArrestsDetails as string) || ""}
              />
              <TextareaField
                id="priorArrestsStatus"
                label='If "yes," what is the status currently?'
                placeholder="Closed, on appeal, outstanding warrants, etc."
                required={stepData.priorArrests === "yes"}
                defaultValue={(stepData.priorArrestsStatus as string) || ""}
              />

              <TextareaField
                id="currentLegalIssues"
                label='Do you have any current legal issues? If "yes" please explain'
                placeholder="Provide context and parties involved"
                required
                defaultValue={(stepData.currentLegalIssues as string) || ""}
              />
              <TextareaField
                id="chargesAndCourtDates"
                label="Description of any charges and any pending court dates"
                placeholder="List charges, court names, dates"
                required
                defaultValue={(stepData.chargesAndCourtDates as string) || ""}
              />

              <SelectField
                id="legalRepresentation"
                label="Do you have legal representation or legal advocate?"
                required
                defaultValue={(stepData.legalRepresentation as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
              <TextareaField
                id="legalRepresentationDetails"
                label='If "yes" please list'
                placeholder="Attorney/advocate name, firm, contact info"
                required={stepData.legalRepresentation === "yes"}
                defaultValue={(stepData.legalRepresentationDetails as string) || ""}
              />

              <SelectField
                id="onProbation"
                label="Are you currently on probation?"
                required
                defaultValue={(stepData.onProbation as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
              <InputField
                id="probationOfficer"
                label='If "yes" please list your probation officer name and contact information'
                placeholder="Name, phone, email"
                required={stepData.onProbation === "yes"}
                defaultValue={(stepData.probationOfficer as string) || ""}
              />
              <TextareaField
                id="probationTerms"
                label="Please list the terms of your probation"
                placeholder="Reporting schedule, restrictions, program requirements"
                required
                defaultValue={(stepData.probationTerms as string) || ""}
              />
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
