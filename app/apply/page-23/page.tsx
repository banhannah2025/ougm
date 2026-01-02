"use client";

import { CheckboxList, SelectField, TextareaField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

const diagnosisOptions = [
  { label: "Mental illness", value: "mental illness" },
  { label: "Alcohol abuse", value: "alcohol abuse" },
  { label: "Drug abuse", value: "drug abuse" },
  { label: "HIV/AIDS and related diseases", value: "hiv/aids and related diseases" },
  { label: "Developmental Disability", value: "developmental disability" },
  { label: "Physical Disability", value: "physical disability" },
  { label: "None", value: "none" },
];

export default function MedicalQuestionnaireCard() {
  const stepId = "medical";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Medical Questionnaire</h1>
          <p className="text-sm text-muted-foreground">
            Share medical history, medications, and substance use to help us support you.
          </p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-22"
          nextHref="/apply/page-24"
          validate={(data) => {
            const diagnoses = data.diagnoses;
            const hasDiagnosis =
              Array.isArray(diagnoses) ? diagnoses.length > 0 : typeof diagnoses === "string";
            if (!hasDiagnosis) return "Please select at least one diagnosis option.";
            const requiresExplanation =
              (Array.isArray(diagnoses) && !(diagnoses.length === 1 && diagnoses[0] === "none")) ||
              (typeof diagnoses === "string" && diagnoses !== "none");
            if (requiresExplanation && !data.diagnosisExplanation) {
              return "Please provide an explanation for selected diagnoses.";
            }

            const requiredSelects = [
              "receivingPsychCare",
              "substanceUseDisorder",
              "recoveryPrograms",
              "medicalHistory",
              "receivingMedicalCare",
              "hospitalizedForConditions",
              "medAllergies",
              "takingPrescribedMeds",
              "receivingDentalCare",
            ];
            const missingSelect = requiredSelects.find((field) => !data[field]);
            if (missingSelect) return "Please answer all yes/no questions.";

            if (data.receivingPsychCare === "yes" && !data.psychiatricMeds) {
              return "Please explain prescribed medications for psychiatric care.";
            }
            if (data.substanceUseDisorder === "yes" && !data.substanceUseDetails) {
              return "Please list drugs used, frequency, and last date used.";
            }
            if (data.recoveryPrograms === "yes" && !data.recoveryProgramNames) {
              return "Please list recovery program names.";
            }
            if (!data.substanceFreeDuration) return "Please share if you are substance free and for how long.";
            if (!data.willingToEnterRecovery)
              return "Please state willingness to join a program or enter recovery.";

            if (data.medicalHistory === "yes" && !data.medicalHistoryDetails) {
              return "Please explain medical history.";
            }
            if (data.hospitalizedForConditions === "yes" && !data.hospitalizationDetails) {
              return "Please explain hospitalizations.";
            }
            if (data.medAllergies === "yes" && !data.medAllergyDetails) {
              return "Please explain medication allergies.";
            }
            if (data.takingPrescribedMeds === "yes" && !data.prescribedMedDetails) {
              return "Please provide prescribed medication details.";
            }
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-6">
              <section className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Are you currently or have you ever been diagnosed with any of the following?
                </h2>
                <CheckboxList
                  name="diagnoses"
                  options={diagnosisOptions}
                  stepData={stepData}
                  required
                />
                <TextareaField
                  id="diagnosisExplanation"
                  label="If selected, please explain"
                  placeholder="Provide details, dates, and current status"
                  required
                  defaultValue={(stepData.diagnosisExplanation as string) || ""}
                />
              </section>

              <SelectField
                id="receivingPsychCare"
                label="Do you receive psychiatric care?"
                required
                defaultValue={(stepData.receivingPsychCare as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="psychiatricMeds"
                label="Do you take any prescribed medications for those conditions? If so, please explain."
                placeholder="List medications, prescriber, and purpose"
                required={stepData.receivingPsychCare === "yes"}
                defaultValue={(stepData.psychiatricMeds as string) || ""}
              />

              <SelectField
                id="substanceUseDisorder"
                label="Do you have any substance abuse disorders?"
                required
                defaultValue={(stepData.substanceUseDisorder as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="substanceUseDetails"
                label="If yes, list drugs used, frequency, and last date used"
                placeholder="Example: Alcohol, 3x/week, last use 2/10/2025"
                required={stepData.substanceUseDisorder === "yes"}
                defaultValue={(stepData.substanceUseDetails as string) || ""}
              />

              <SelectField
                id="recoveryPrograms"
                label="Are you involved in any recovery programs?"
                required
                defaultValue={(stepData.recoveryPrograms as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="recoveryProgramNames"
                label="If yes, list program names"
                placeholder="AA, NA, treatment center, etc."
                required={stepData.recoveryPrograms === "yes"}
                defaultValue={(stepData.recoveryProgramNames as string) || ""}
              />

              <TextareaField
                id="substanceFreeDuration"
                label="Are you substance free? If so, for how long?"
                placeholder="Example: Yes, 4 months"
                required
                defaultValue={(stepData.substanceFreeDuration as string) || ""}
              />

              <TextareaField
                id="willingToEnterRecovery"
                label="If currently using, are you willing to join a program or enter recovery as advised by a case manager?"
                placeholder="Yes/No and any details"
                required
                defaultValue={(stepData.willingToEnterRecovery as string) || ""}
              />

              <SelectField
                id="medicalHistory"
                label="Do you have a history of any medical conditions?"
                required
                defaultValue={(stepData.medicalHistory as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <SelectField
                id="receivingMedicalCare"
                label="If yes, do you receive medical care?"
                required
                defaultValue={(stepData.receivingMedicalCare as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="medicalHistoryDetails"
                label="If yes, explain history of medical conditions"
                placeholder="Diagnoses, treatments, providers"
                required={stepData.medicalHistory === "yes"}
                defaultValue={(stepData.medicalHistoryDetails as string) || ""}
              />

              <SelectField
                id="hospitalizedForConditions"
                label="Have you been hospitalized for any of these conditions?"
                required
                defaultValue={(stepData.hospitalizedForConditions as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="hospitalizationDetails"
                label="If yes, please explain"
                placeholder="Dates, reasons, hospital names"
                required={stepData.hospitalizedForConditions === "yes"}
                defaultValue={(stepData.hospitalizationDetails as string) || ""}
              />

              <SelectField
                id="medAllergies"
                label="Are you allergic to any medications?"
                required
                defaultValue={(stepData.medAllergies as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="medAllergyDetails"
                label="If yes, please explain"
                placeholder="Medication names and reactions"
                required={stepData.medAllergies === "yes"}
                defaultValue={(stepData.medAllergyDetails as string) || ""}
              />

              <SelectField
                id="takingPrescribedMeds"
                label="Do you take any prescribed medications?"
                required
                defaultValue={(stepData.takingPrescribedMeds as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />

              <TextareaField
                id="prescribedMedDetails"
                label="If yes, provide prescribing doctor, medication names/purposes, last date filled, quantity, and dose instructions"
                placeholder="Doctor name, medication list, fill dates, dosing"
                required={stepData.takingPrescribedMeds === "yes"}
                defaultValue={(stepData.prescribedMedDetails as string) || ""}
              />

              <SelectField
                id="receivingDentalCare"
                label="Do you receive dental care?"
                required
                defaultValue={(stepData.receivingDentalCare as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
