"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function RelationshipsVisitorsCard() {
  const stepId = "relationshipsVisitors";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Relationships and Visitors</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Program member&apos;s are part of Camp Mercy to address life issues and move on to independent living.
            Relationships are a distraction from the overall goals of Camp Mercy and are not permitted. Intimate,
            physical, and /or sexual behavior is not permitted on the premises; this applies to both Program Members and
            their visitors. Romantic or sexual involvement or advances towards other Program Members, staff, mission guests
            or volunteers is not permitted.
          </p>
          <p>
            Tiny houses residents are representatives of the Mission&apos;s  Camp Mercy and will be required to conduct
            themselves in a professional manner. If a Tiny House resident is involved in verbal or physical advances
            towards persons at the mission, immediate dismissal can be the result. No visitors shall enter the: Enclosed
            Area, Tiny Houses at any time without permission of Camp Staff.
          </p>
          <p>
            Visiting hours are 9AM to 5PM and should occur on Mission property outside the Camp area. No minors are
            allowed on the property at any time. Prior Program Members are not permitted to return to visit without prior
            approval of the Camp Staff. Hosting Program Members must stay with their visitor and are responsible for their
            behavior. The Olympia Union Gospel Mission is private property; Camp Staff reserve the right to ask any visitor
            to leave, as well as prohibit visitors from returning.
          </p>
          <p>
            All Program Members are required to notify Camp Staff each time before a guest arrives at the property to
            visit, pick them up, or drop them off. No pets are allowed.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-13"
          nextHref="/apply/page-15"
          validate={(data) =>
            !data.ackRelationshipsVisitors
              ? "Please acknowledge the relationships and visitors requirements."
              : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackRelationshipsVisitors"
                  required
                  defaultChecked={Boolean(stepData.ackRelationshipsVisitors)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand and agree to follow the requirements of relationships and visitors.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
