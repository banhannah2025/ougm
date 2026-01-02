"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { clearApplicationData } from "@/lib/apply-storage";

export default function ApplicationIntroPage() {
  useEffect(() => {
    clearApplicationData();
  }, []);

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-6 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm sm:p-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Camp Mercy Application
          </p>
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold text-foreground">Men&apos;s Camp Mercy Program Application</h1>
            <p className="text-sm font-semibold text-foreground">
              PLEASE NOTE: CAMP MERCY IS A PROGRAM FOR CLEAN AND SOBER SINGLE MEN WHO ARE 18 YEARS OLD OR OVER.
            </p>
          </div>
        </header>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Camp Mercy is intended to be a safe place for people experiencing homelessness to get themselves out of
            homelessness and become self-sufficient. We will teach new skills and help our residents organize their lives.
          </p>
          <p>
            We accept individuals that don&apos;t want to live on the streets and can follow the program guidelines without
            resistance with staff or the case manager.
          </p>
          <div className="space-y-2">
            <p className="font-medium text-foreground">As a resident, you agree to:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Maintain sobriety</li>
              <li>Obtain steady full-time employment</li>
              <li>Live a law-abiding lifestyle</li>
              <li>Obtain mental health support if needed</li>
              <li>Follow the financial stability plan</li>
            </ul>
          </div>
          <p>
            If you believe you are a good candidate for Camp Mercy please go on to read the rules and regulations and
            continue your application that will follow.
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <Button asChild size="lg">
            <Link href="/apply/page-2">Continue</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
