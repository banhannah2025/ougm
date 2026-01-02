"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function OperationFeeCard() {
  const stepId = "programFee";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Program Fee</h1>
          <p className="text-sm text-muted-foreground">
            Overview of the monthly fee and payment expectations for Camp Mercy residents.
          </p>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Program Members are to allocate $200.00 per month to help off-set the cost of operating Camp Mercy. This
            program fee is not to be considered as rent paid for any dwelling at the Olympia Union Gospel Mission. There
            will be no refunds of paid amounts if the resident is asked to vacate due to a compliance or rule violation.
          </p>
          <p>
            The PROGRAM FEE IS TO BE PAID BY THE FIRST OF THE MONTH. Payments made on or after the 5th of the month please
            include a $20.00 late fee. This is in place for the residents to become used to paying for their living
            environment each month, on time.
          </p>
          <p>
            <b>Payment should be made to the:</b> Olympia Union Gospel Mission/Camp Mercy 309 Washington NE Olympia WA.{" "}
            <b>Payment Office Hours are</b> 8:00am-4:00pm Monday-Friday. <b>Over the phone payments should be paid by
            calling</b> 360 709-9725.
          </p>
          <p>
            When calling it is imperative that you mention that you are a resident at Camp Mercy along with your house
            number when paying your program fee so the funds are allocated correctly.
          </p>
          <p>
            Method of payment can be <b>cash, check, money order, debit card</b> or you can set up direct withdraw through
            your employer and the Mission.
          </p>
          <p>
            If the resident is not yet employed when entering Camp Mercy the Case Manager will work with the incoming
            resident regarding the monthly
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-2"
          nextHref="/apply/page-4"
          validate={(data) => (!data.ackOperationFee ? "Please acknowledge the program fee." : null)}
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackOperationFee"
                  required
                  defaultChecked={Boolean(stepData.ackOperationFee)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>I understand the operaton fee and agree to the terms.</span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
