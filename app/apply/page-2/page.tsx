"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function WorkRequirementsCard() {
  const stepId = "workRequirements";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Work Requirements</h1>
          <p className="text-sm font-medium text-foreground">
            Residents will be required to obtain steady full time employment of 40 hours per week.
          </p>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            After you enter the program you will be given time to take care of any issues regarding obtaining documents
            of identification, kitchen work permits, responding to any court issues, DOC, medical issues addressed etc.
          </p>
          <p>Then you will be held to the &quot;working full time of 40 hours per week&quot;.</p>
          <p>
            &quot;Working&quot; in the beginning are hours spent applying for jobs, interviews, job training, applying and
            setting up going to school, handlining court appointments. All of these things require you to be &quot;working&quot;
            on them so are considered &quot;working hours&quot;.
          </p>
          <p>Time spent on achieving your goals will be on a case by case with your case manager.</p>
          <p>
            The remaining &quot;work hours&quot; are directed in volunteering at the mission to reach the 40 hour
            requirement to prevent isolation, depression and becoming unproductive working towards your goals.
          </p>
          <p>
            For example, you spent 15 hours during the week applying for work or above tasks, you would then do 25 hours
            of volunteer work to reach the 40 hours.
          </p>
          <p>We will love having you around and appreciate your volunteer work but we don&apos;t not want you to remain a volunteer.</p>
          <p>
            We want you to get paid for your hard work at outside employment and will be excited to see you beginning the
            next phase of your program.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply"
          nextHref="/apply/page-3"
          validate={(data) => {
            if (!data.ackWorkRequirements) return "Please acknowledge the work requirements.";
            return null;
          }}
        >
          {({ stepData }) => (
            <div className="space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackWorkRequirements"
                  required
                  defaultChecked={Boolean(stepData.ackWorkRequirements)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand the work requirements and agree to follow those requirements.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
