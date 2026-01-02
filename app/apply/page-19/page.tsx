"use client";

import { InputField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

export default function PersonalInfoCard() {
  const stepId = "personalInfo";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Personal Information</h1>
          <p className="text-sm text-muted-foreground">Tell us about yourself and how to reach you.</p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-18"
          nextHref="/apply/page-20"
          validate={(data) => {
            const requiredFields = [
              "legalFirstName",
              "legalMiddleName",
              "legalLastName",
              "contactPhone",
              "email",
              "ssn",
              "placeOfBirth",
              "dob",
              "mailingAddress",
            ];
            const missing = requiredFields.find((field) => !data[field]);
            if (missing) return "Please complete all personal information fields.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  id="legalFirstName"
                  label="Legal first name"
                  required
                  defaultValue={(stepData.legalFirstName as string) || ""}
                />
                <InputField
                  id="legalMiddleName"
                  label="Legal middle name"
                  required
                  defaultValue={(stepData.legalMiddleName as string) || ""}
                />
                <InputField
                  id="legalLastName"
                  label="Legal last name"
                  required
                  defaultValue={(stepData.legalLastName as string) || ""}
                />
                <InputField
                  id="contactPhone"
                  label="Contact phone number"
                  type="tel"
                  required
                  defaultValue={(stepData.contactPhone as string) || ""}
                />
                <InputField
                  id="email"
                  label="Email address"
                  type="email"
                  required
                  defaultValue={(stepData.email as string) || ""}
                />
                <InputField
                  id="ssn"
                  label="Social Security Number"
                  inputMode="numeric"
                  required
                  defaultValue={(stepData.ssn as string) || ""}
                />
                <InputField
                  id="placeOfBirth"
                  label="Place of birth"
                  required
                  defaultValue={(stepData.placeOfBirth as string) || ""}
                />
                <InputField
                  id="dob"
                  label="Date of birth"
                  type="date"
                  required
                  defaultValue={(stepData.dob as string) || ""}
                />
              </div>

              <InputField
                id="mailingAddress"
                label="Mailing address"
                required
                defaultValue={(stepData.mailingAddress as string) || ""}
              />
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
