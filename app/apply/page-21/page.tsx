"use client";

import { InputField, SelectField, TextareaField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

export default function EmploymentQuestionnaireCard() {
  const stepId = "employment";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Employment Questionnaire</h1>
          <p className="text-sm text-muted-foreground">
            Share your current work status and any training or education needs.
          </p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-20"
          nextHref="/apply/page-22"
          validate={(data) => {
            const requiredSelects = [
              "currentlyEmployed",
              "needTraining",
              "attendedEmploymentTraining",
              "currentEducationProgram",
              "hasDiplomaOrGed",
              "wantGedHelp",
            ];
            const missingSelect = requiredSelects.find((field) => !data[field]);
            if (missingSelect) return "Please complete all employment selections.";

            if (data.currentlyEmployed === "yes") {
              if (!data.currentEmployer) return "Please provide your employer.";
              if (!data.employmentType) return "Please select part-time or full-time.";
            }
            if (data.currentlyEmployed === "no" && !data.ableToWorkFullTime) {
              return "Please indicate if you can work full time.";
            }
            if (data.currentlyEmployed === "no" && data.ableToWorkFullTime === "no" && !data.unableToWorkExplanation) {
              return "Please explain why you cannot work full time.";
            }
            if (data.needTraining === "yes" && !data.trainingField) {
              return "Please specify the training field.";
            }
            if (!data.pastWorkExperience) return "Please provide past work experience.";
            if (data.attendedEmploymentTraining === "yes" && !data.attendedEmploymentTrainingDetails) {
              return "Please explain employment training history.";
            }
            if (data.currentEducationProgram === "yes" && !data.currentEducationProgramDetails) {
              return "Please explain current education status.";
            }
            if (data.hasDiplomaOrGed === "no" && !data.wantGedHelp) {
              return "Please indicate if you would like help getting your GED.";
            }
            if (!data.highestGradeCompleted) return "Please provide the highest grade completed.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="currentlyEmployed"
                  label="Are you currently employed?"
                  required
                  defaultValue={(stepData.currentlyEmployed as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <InputField
                  id="currentEmployer"
                  label="If yes, who is your employer?"
                  required={stepData.currentlyEmployed === "yes"}
                  defaultValue={(stepData.currentEmployer as string) || ""}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="employmentType"
                  label="If employed, is it part time or full time?"
                  required={stepData.currentlyEmployed === "yes"}
                  defaultValue={(stepData.employmentType as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "part-time", label: "Part time" },
                    { value: "full-time", label: "Full time" },
                  ]}
                />
                <SelectField
                  id="ableToWorkFullTime"
                  label="If not employed, are you able to work full time?"
                  required={stepData.currentlyEmployed === "no"}
                  defaultValue={(stepData.ableToWorkFullTime as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>

              <TextareaField
                id="unableToWorkExplanation"
                label="If not able to work full time, please explain why"
                placeholder="Medical, scheduling, transportation, or other reasons"
                required={stepData.ableToWorkFullTime === "no"}
                defaultValue={(stepData.unableToWorkExplanation as string) || ""}
              />

              <TextareaField
                id="pastWorkExperience"
                label="Past work experience"
                placeholder="List recent roles, industries, and primary duties"
                required
                defaultValue={(stepData.pastWorkExperience as string) || ""}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="needTraining"
                  label="Do you need training to obtain your desired employment?"
                  required
                  defaultValue={(stepData.needTraining as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <InputField
                  id="trainingField"
                  label="If yes, what field?"
                  required={stepData.needTraining === "yes"}
                  defaultValue={(stepData.trainingField as string) || ""}
                />
              </div>

              <TextareaField
                id="attendedEmploymentTrainingDetails"
                label="Have you ever attended employment training? If so, please explain"
                placeholder="Where, when, and what skills were covered"
                required={stepData.attendedEmploymentTraining === "yes"}
                defaultValue={(stepData.attendedEmploymentTrainingDetails as string) || ""}
              />

              <TextareaField
                id="currentEducationProgramDetails"
                label="Are you currently enrolled in an educational program? If so, please explain"
                placeholder="School or program name, area of study, schedule"
                required={stepData.currentEducationProgram === "yes"}
                defaultValue={(stepData.currentEducationProgramDetails as string) || ""}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="hasDiplomaOrGed"
                  label="Have you received your high school diploma or GED?"
                  required
                  defaultValue={(stepData.hasDiplomaOrGed as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "diploma", label: "High school diploma" },
                    { value: "ged", label: "GED" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  id="wantGedHelp"
                  label="If not, would you like help getting your GED?"
                  required
                  defaultValue={(stepData.wantGedHelp as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>

              <InputField
                id="highestGradeCompleted"
                label="What is the highest grade you completed?"
                required
                defaultValue={(stepData.highestGradeCompleted as string) || ""}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  id="attendedEmploymentTraining"
                  label="Have you ever attended employment training?"
                  required
                  defaultValue={(stepData.attendedEmploymentTraining as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  id="currentEducationProgram"
                  label="Are you currently enrolled in an educational program?"
                  required
                  defaultValue={(stepData.currentEducationProgram as string) || ""}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </div>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
