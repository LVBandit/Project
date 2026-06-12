import Link from "next/link"
import type { ReactNode } from "react"
import { DotGridBackground } from "@/components/dot-grid-background"
import { MagnifyDock } from "@/components/magnify-dock"

interface PageShellProps {
  eyebrow: string
  title: ReactNode
  subtitle?: string
  children?: ReactNode
}

export function PageShell({ eyebrow, title, subtitle, children }: PageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <DotGridBackground />

      <div className="relative z-10 flex flex-col">
        <nav className="flex items-center justify-between px-6 py-6 md:px-12">
          <Link href="/" className="text-lg font-medium tracking-tight text-foreground/90">
            Bandit Project
          </Link>
          <Link
            href="/"
            className="rounded-full border border-border bg-transparent px-5 py-2 text-[13px] text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground/75"
          >
            ← Back home
          </Link>
        </nav>

        <section className="flex flex-col items-center justify-center px-4 pb-12 pt-16 text-center">
          <span className="mb-6 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs uppercase tracking-[0.12em] text-primary/80">
            {eyebrow}
          </span>
          <h1 className="mb-6 max-w-[700px] text-balance text-4xl font-medium leading-[1.1] tracking-tight text-foreground/90 md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mb-10 max-w-[480px] text-pretty text-[17px] leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </section>

        <div className="px-6 pb-28 md:px-12">{children}</div>
      </div>

      <MagnifyDock />
    </main>
  )
}
