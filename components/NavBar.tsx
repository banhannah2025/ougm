"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navLinks } from "@/lib/nav-links";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadRole() {
      try {
        const res = await fetch("/api/me/role", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { roles?: string[] | null };
        setIsAdmin(Array.isArray(data.roles) ? data.roles.includes("admin") : false);
      } catch {
        // ignore errors
      }
    }
    loadRole();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="flex items-center gap-2">
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-primary">Camp Mercy</span>
            <span className="text-xs font-medium text-accent">By OUGM</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks
            .filter((link) => !link.requiresAdmin || isAdmin)
            .map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="outline" size="sm">
            <a href="/apply">Camp Mercy Application</a>
          </Button>
          <ThemeToggle />
          <SignedIn>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "border border-border" } }} />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary" size="sm">
                Sign up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadRole() {
      try {
        const res = await fetch("/api/me/role", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { roles?: string[] | null };
        setIsAdmin(Array.isArray(data.roles) ? data.roles.includes("admin") : false);
      } catch {
        // ignore
      }
    }
    loadRole();
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 flex w-[85%] max-w-sm flex-col gap-6 border-l border-border/80 bg-background px-6 py-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-tight text-primary">
                Camp Mercy
              </span>
              <span className="text-[11px] font-medium text-accent">By OUGM</span>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close navigation">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-3">
            {navLinks
              .filter((link) => !link.requiresAdmin || isAdmin)
              .map((link) => (
                <Dialog.Close asChild key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-lg border border-transparent px-3 py-2 text-base font-medium text-foreground/90 transition-colors hover:border-border hover:bg-muted/80"
                  >
                    {link.label}
                  </a>
                </Dialog.Close>
              ))}
          </div>

          <div className="flex flex-col gap-3">
            <Dialog.Close asChild>
              <Button asChild className="w-full">
                <a href="/apply">Camp Mercy Application</a>
              </Button>
            </Dialog.Close>
          </div>

          <div className="mt-auto flex items-center gap-3">
            <SignedIn>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "border border-border" } }} />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="flex-1">
                  Sign in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="secondary" className="flex-1">
                  Sign up
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
