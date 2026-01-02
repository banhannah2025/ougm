"use client";

import { SelectField, TextareaField } from "@/components/apply/Fields";
import { StepForm } from "@/components/apply/StepForm";

export default function SocialLifeCard() {
  const stepId = "socialLife";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Social Life</h1>
          <p className="text-sm text-muted-foreground">Tell us about your community, hobbies, and activity level.</p>
        </header>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-23"
          nextHref="/apply/page-25"
          validate={(data) => {
            if (!data.faithActivities) return "Please describe your faith-based activities.";
            if (!data.socialNetworks) return "Please answer about social/recreational activities.";
            if (data.socialNetworks === "yes" && !data.socialNetworksDetails) {
              return "Please explain your social/recreational activities.";
            }
            if (!data.hobbies) return "Please share your hobbies or interests.";
            if (!data.physicalActivity) return "Please select your physical activity level.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="mt-5 space-y-6">
              <TextareaField
                id="faithActivities"
                label="Are you involved in any spiritual or faith based activities? If so, please explain."
                placeholder="Church, small groups, recovery ministries, etc."
                required
                defaultValue={(stepData.faithActivities as string) || ""}
              />

              <SelectField
                id="socialNetworks"
                label="Are you involved with any social networks or recreational activities?"
                required
                defaultValue={(stepData.socialNetworks as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
              <TextareaField
                id="socialNetworksDetails"
                label="If yes, please explain."
                placeholder="Sports, clubs, groups, online communities, etc."
                required={stepData.socialNetworks === "yes"}
                defaultValue={(stepData.socialNetworksDetails as string) || ""}
              />

              <TextareaField
                id="hobbies"
                label="Do you have any hobbies or things you enjoy doing? If so, please explain."
                placeholder="Music, art, outdoors, volunteering, etc."
                required
                defaultValue={(stepData.hobbies as string) || ""}
              />

              <SelectField
                id="physicalActivity"
                label="Are you physically active?"
                required
                defaultValue={(stepData.physicalActivity as string) || ""}
                options={[
                  { value: "", label: "Select an option" },
                  { value: "yes", label: "Yes" },
                  { value: "somewhat", label: "Somewhat" },
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
