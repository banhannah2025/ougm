"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

export function StepTwo({
  appId,
  onSaved,
}: {
  appId: string;
  onSaved: (id: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const ackDrug = formData.get("ackDrug") === "on";
    const ackContract = formData.get("ackContract") === "on";

    if (!ackDrug || !ackContract) {
      setError("Please acknowledge both sections before continuing.");
      setPending(false);
      return;
    }

    const res = await fetch("/api/apply/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        appId,
        acknowledgements: { drug: ackDrug, contract: ackContract },
      }),
    });
    const json = await res.json();
    if (!res.ok || json.error) {
      setError(json.error || "Failed to save. Please try again.");
      setPending(false);
      return;
    }

    onSaved(appId);
    setPending(false);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm sm:p-8"
    >
      <Section
        title="Drug Testing and Drug/Alcohol Use"
        checkboxName="ackDrug"
        checkboxLabel="I understand the drug testing policy and agree to follow."
        body={
          <>
            <p>
              Camp Mercy is a drug and alcohol-Free Camp - Drug or Alcohol possession or usage,
              including marijuana is strictly forbidden. Camp Program Members are required to submit
              to urine or saliva drug testing as a condition for being a Program Member. Any violation
              of this rule can result in being discharged from the Program and eviction. Additionally,
              no drug paraphernalia of any kind is allowed on the property. No Program Member shall be
              intoxicated or under the influence of drugs or alcohol on the property at any time.
            </p>
            <p>
              The Olympia Union Gospel Mission reserves the right to request that a Program Members
              submit to a drug or alcohol screen at any time, with or without cause. Failure to comply
              with the request will be considered as if the screen had been positive and the Program
              Member will be discharged from the Program and evicted.
            </p>
            <p>
              If a Program Member believes another Program Member is in possession of banned drugs or
              alcohol, or is under the influence of any substance at any time, Camp Staff must be
              contacted immediately. It is everyone&apos;s responsibility to keep Camp Mercy safe.
              Failure to notify Staff of another Program Member&apos;s use of substances can result in
              immediate discharge.
            </p>
          </>
        }
      />

      <Section
        title="Acknowledgement and agreement to the Camp Mercy Contract I have just read through."
        checkboxName="ackContract"
        checkboxLabel="I understand that I have agreed to all of the Camp Mercy Policies representing my signature."
        body={
          <>
            <p>
              I understand that my &quot;clicking I understand and agree&quot; was my signature. By
              checking the box below, you are acknowledging that you have received a copy of the
              contract, read it and understand everything I have read.
            </p>
            <p>
              I understand that if I have any questions about anything listed, I will have the
              opportunity to bring them up during the interview process.
            </p>
            <p>
              You understand that failure to abide by these expectations may result in being
              discharged from the Program, eviction and as appropriate the discharge will be reported
              to your DOC officer or case manager. You also acknowledge that the expectations of this
              contract may be changed at any time by the Union Gospel Missions Camp Mercy Coordinator
              or Executives.
            </p>
          </>
        }
      />

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      {pending && !error && (
        <p className="text-xs text-muted-foreground">Saving page 2 acknowledgements…</p>
      )}
      <div className="flex justify-end">
        <SubmitButton pending={pending} />
      </div>
    </form>
  );
}

function Section({
  title,
  body,
  checkboxName,
  checkboxLabel,
}: {
  title: string;
  body: React.ReactNode;
  checkboxName: string;
  checkboxLabel: string;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-border/70 bg-background/60 p-5">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="space-y-2 text-sm text-muted-foreground">{body}</div>
      </div>
      <label className="flex items-start gap-2 text-sm font-medium text-foreground">
        <input
          type="checkbox"
          name={checkboxName}
          required
          className="mt-1 h-4 w-4 accent-primary"
        />
        <span>{checkboxLabel}</span>
      </label>
    </section>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  const { pending: formPending } = useFormStatus();
  const isPending = pending || formPending;
  return (
    <Button type="submit" size="lg" disabled={isPending}>
      {isPending ? "Saving..." : "Save and continue"}
    </Button>
  );
}
