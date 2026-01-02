"use client";

import { SelectField, TextareaField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

const incomeSources = [
  "No",
  "Social Security Income (SSI)",
  "General Assistance (SAGA)",
  "Temporary Aid to Needy Families (TANF)",
  "Child Support",
  "Alimony",
  "Veteran Benefits",
  "Employment Income",
  "Unemployment",
  "Medicare",
  "Food Stamps",
  "Other",
];

export default function FinancialQuestionnaireCard() {
  const stepId = "financial";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Financial Questionnaire</h1>
          <p className="text-sm text-muted-foreground">Share your income, debts, and any settlements.</p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-24"
          nextHref="/apply/page-26"
          validate={(data) => {
            if (!data.incomeSource) return "Please select your income source.";
            if (data.incomeSource !== "no" && !data.incomeAmounts) {
              return "Please provide income amounts.";
            }
            if (data.incomeSource === "other" && !data.otherIncomeDetails) {
              return "Please explain the other income source.";
            }
            if (!data.outstandingDebts) return "Please list outstanding debts.";
            if (!data.monthlyBills) return "Please list monthly bills.";
            if (!data.settlements) return "Please answer about settlements.";
            if (data.settlements === "yes" && !data.settlementDetails) {
              return "Please explain settlements.";
            }
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-6">
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Do you have a source of income? (Check only one)
                </h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {incomeSources.map((source, idx) => (
                    <label key={source} className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="radio"
                        name="incomeSource"
                        value={source.toLowerCase()}
                        required={idx === 0}
                        defaultChecked={stepData.incomeSource === source.toLowerCase()}
                        className="h-4 w-4 accent-primary"
                      />
                      <span>{source}</span>
                    </label>
                  ))}
                </div>
              </section>

              <TextareaField
                id="incomeAmounts"
                label="If yes to any income source, provide amounts"
                placeholder="Example: SSI $900/month; Employment $1,200/month"
                required={stepData.incomeSource !== "no"}
                defaultValue={(stepData.incomeAmounts as string) || ""}
              />

              <TextareaField
                id="otherIncomeDetails"
                label="If 'Other', please explain"
                placeholder="Describe the income source and amount"
                required={stepData.incomeSource === "other"}
                defaultValue={(stepData.otherIncomeDetails as string) || ""}
              />

              <TextareaField
                id="outstandingDebts"
                label="List any outstanding debts and amounts"
                placeholder="Credit cards, loans, fines, etc."
                required
                defaultValue={(stepData.outstandingDebts as string) || ""}
              />

              <TextareaField
                id="monthlyBills"
                label="List monthly bills and amounts"
                placeholder="Rent, utilities, phone, transportation, etc."
                required
                defaultValue={(stepData.monthlyBills as string) || ""}
              />

              <SelectField
                id="settlements"
                label="Do you have any settlements currently or pending?"
                required
                defaultValue={(stepData.settlements as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="settlementDetails"
                label="If yes, please explain"
                placeholder="Type of settlement, expected amount, timeline"
                required={stepData.settlements === "yes"}
                defaultValue={(stepData.settlementDetails as string) || ""}
              />
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
