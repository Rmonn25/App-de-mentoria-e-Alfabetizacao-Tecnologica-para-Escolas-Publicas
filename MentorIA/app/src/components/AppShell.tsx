import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Camera, Home, Mic, Users, Bell } from "lucide-react";

const tabs = [
  { to: "/", label: "Início", icon: Home },
  { to: "/foto", label: "Foto", icon: Camera },
  { to: "/voz", label: "Voz", icon: Mic },
  { to: "/mentores", label: "Mentores", icon: Users },
] as const;

export function AppShell() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-dvh w-full bg-gradient-to-b from-primary-soft via-background to-background flex justify-center">
      <div className="relative w-full max-w-[440px] min-h-dvh bg-background flex flex-col shadow-glow md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[2.25rem] md:overflow-hidden md:border md:border-border">
        {/* Status bar */}
        <header className="flex items-center justify-between px-5 h-12 bg-[image:var(--gradient-primary)] text-primary-foreground flex-shrink-0">
          <div className="font-extrabold tracking-tight text-[17px]">
            Mentor<span className="text-primary-soft">IA</span>
          </div>
          <Bell className="size-4 opacity-80" />
        </header>

        {/* Screens */}
        <main key={pathname} className="flex-1 overflow-y-auto animate-in fade-in slide-in-from-right-2 duration-300">
          <Outlet />
        </main>

        {/* Bottom tabs */}
        <nav className="flex border-t border-border bg-card/95 backdrop-blur px-2 pt-1.5 pb-[max(env(safe-area-inset-bottom),0.5rem)] flex-shrink-0">
          {tabs.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[10px] font-semibold transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-5" strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
