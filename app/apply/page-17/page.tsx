"use client";

import { StepForm } from "@/components/apply/StepForm";

export default function ContractAcknowledgementCard() {
  const stepId = "contractAcknowledgement";

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            Acknowledgement and Agreement to the Camp Mercy Contract
          </h1>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>I understand that my &quot;clicking I understand and agree&quot; was my signature.</p>
          <p>
            By checking the box below, you are acknowledging that you have received a copy of the contract, read it and
            understand everything I have read.
          </p>
          <p>
            I understand that if I have any questions about anything listed, I will have the opportunity to bring them up
            during the interview process.
          </p>
          <p>
            You understand that failure to abide by these expectations may result in being discharged from the Program,
            eviction and as appropriate the discharge will be reported to your DOC officer or case manager. You also
            acknowledge that the expectations of this contract may be changed at any time by the Union Gospel Missions
            Camp Mercy Coordinator or Executives.
          </p>
        </div>

        <StepForm
          stepId={stepId}
          prevHref="/apply/page-16"
          nextHref="/apply/page-18"
          validate={(data) =>
            !data.ackContractSignature
              ? "Please acknowledge the Camp Mercy contract."
              : null
          }
        >
          {({ stepData }) => (
            <div className="mt-6 space-y-3">
              <label className="flex items-start gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  name="ackContractSignature"
                  required
                  defaultChecked={Boolean(stepData.ackContractSignature)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  I understand and have agreed to all of the camp mercy policies and clicking this checkbox acts as and
                  represents my electronic signature.
                </span>
              </label>
            </div>
          )}
        </StepForm>
      </div>
    </main>
  );
}
