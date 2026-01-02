"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function FinancialStabilityPlanCard() {
  const stepId = "financialStability";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Financial Stability Plan</h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            While you are at Camp Mercy your case manager will assist you through becoming proficient in your own
            financial management. You will be learning ways to manage your income and expenses. We will be setting future
            financial goals to attempt to clear up any outstanding debt you may have.
          </p>
          <p>
            The Camp Coordinator will oversee this process to maintain the integrity of the residents budgeting and
            saving for your future secure living situation. This <b>&quot;Financial Stability Plan&quot;</b> must be
            followed in order to be a Camp Mercy Resident. <b>Failure to follow this process will make you ineligible to
            remain in Camp Mercy.</b>
          </p>
          <p>
            You will identity any items in collections that need to be taken care of. Those who are financially capable
            of handling their finances will just be on a weekly update and monthly audit and less instruction will be
            needed.
          </p>
          <p>
            Because of the precious time allowed for mastering your finances, any unauthorized spending will be in
            violation and can result in dismissal from the program. Residents will be asked to separate and add up their
            spending at the end of each week into 4 separate categories:
          </p>
          <ul className="list-decimal space-y-1 pl-5">
            <li>Bills paid (No new debt without prior approval)</li>
            <li>Unexpected Expense (Needs prior approval)</li>
            <li>Food Budget (Amount agreed on between resident and Case Manager to follow)</li>
            <li>Entertainment Spending (Can NOT exceed 10% of your paycheck)</li>
          </ul>
          <p>
            The rest of your income is to be saved in a checking or savings account of your choice for your nest egg and
            to become financially self dependent.
          </p>
          <p>
            Residents are required to submit a weekly bank statement showing their spending compliance. Because the
            nature of our sobriety program, any cash withdrawals will need to be explained in detail with receipts. It is
            more efficient for you and the case manager if you don&apos;t withdraw money but use your debit card.
            Learning to manage income and expenses as well as save for the future is an invaluable life skill.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-3"
          nextHref="/apply/page-5"
          validate={(data) => (!data.ackFinancialPlan ? "Please acknowledge the Financial Stability Plan." : null)}
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackFinancialPlan"
                  required
                  defaultChecked={Boolean(stepData.ackFinancialPlan)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand and agree to the Financial Stability Plan.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
