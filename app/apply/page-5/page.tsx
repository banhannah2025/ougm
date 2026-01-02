"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function IntakeDurationCard() {
  const stepId = "intakeDuration";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Intake / Program Duration</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Subject to successfully completing the application process and background check, Program Members will be
            admitted to Camp Mercy for an initial period of up to 30 days. At the end of the first week, Program Members
            will meet with Camp Coordinator to determine short term goals to address any immediate needs like medical,
            dental, acquiring any documents needed and future housing goals.
          </p>
          <p>
            Thereafter, Program Members will meet with the Camp Mercy Coordinator each week to discuss progress towards
            established goals and to set new goals. Goals will include becoming proficient in financial management,
            including budgeting. Camp Mercy is intended to help Program Members determine what specific changes need to
            be made in their lives, including financial management, to become self-sufficient.
          </p>
          <p>
            At the end of each 30 day cycle, Program Members will be evaluated to determine if the agreed upon goals are
            being met, and if not why. Extension to the expiring 30 days stay as a Program Member will be determined at
            that time based on adherence to Camp rules and progress towards agreed goals. The Mission will renew the 30
            day cycle up to six (6) times for Program Members who are making a good faith effort to become employed and
            self-sufficient members of society. <b>This will be determined case by case.</b>
          </p>
          <p>
            The Missions intent is to come beside Program Members and give them a hand up not just a handout. If at any
            time the Executive Director or Camp Mercy Coordinator determines that a Program Member is not serious about
            life change in a clean and sober environment the Program Member may be discharged from the Camp.
          </p>
          <p>
            <b>All Program Members must abide by the rules below.</b>
          </p>
          <p>
            Violations of these rules will result in disciplinary action and may be grounds for immediate discharge from
            the Program and being asked to immediately leave Mission property. It is the Program Members responsibility to
            remain familiar with all program rules and standards.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-4"
          nextHref="/apply/page-6"
          validate={(data) =>
            !data.ackIntakeDuration ? "Please acknowledge the intake and duration terms." : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackIntakeDuration"
                  required
                  defaultChecked={Boolean(stepData.ackIntakeDuration)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand and agree to the intake and duration terms and conditions.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
