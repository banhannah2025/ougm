export type NavLink = {
  label: string;
  href: string;
  requiresAdmin?: boolean;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Admin", href: "/admin", requiresAdmin: true },
];
