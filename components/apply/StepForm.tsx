"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  clearApplicationData,
  formDataToObject,
  loadStepData,
  saveStepData,
} from "@/lib/apply-storage";

type StepFormProps = {
  stepId: string;
  nextHref?: string;
  prevHref?: string;
  children: (opts: { stepData: Record<string, unknown> }) => React.ReactNode;
  validate?: (data: Record<string, unknown>) => string | null;
  onFinalSubmit?: (data: Record<string, unknown>) => Promise<void>;
  primaryLabel?: string;
};

export function StepForm({
  stepId,
  nextHref,
  prevHref,
  children,
  validate,
  onFinalSubmit,
  primaryLabel = "Continue",
}: StepFormProps) {
  const router = useRouter();
  const [stepData, setStepData] = useState<Record<string, unknown>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setStepData(loadStepData(stepId));
    setHydrated(true);
  }, [stepId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const data = formDataToObject(new FormData(e.currentTarget));

    if (validate) {
      const err = validate(data);
      if (err) {
        setError(err);
        setSubmitting(false);
        return;
      }
    }

    saveStepData(stepId, data);

    if (onFinalSubmit) {
      try {
        await onFinalSubmit(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
        setSubmitting(false);
        return;
      }
      clearApplicationData();
      router.push("/apply/complete");
      return;
    }

    if (nextHref) {
      router.push(nextHref);
    }
    setSubmitting(false);
  }

  if (!hydrated) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {children({ stepData })}
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      <div className="flex items-center justify-between pt-2">
        {prevHref ? (
          <button
            type="button"
            onClick={() => router.push(prevHref)}
            className="rounded-lg border border-border/70 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saving..." : primaryLabel}
        </button>
      </div>
    </form>
  );
}
