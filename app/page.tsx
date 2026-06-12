import Link from "next/link"
import { DotGridBackground } from "@/components/dot-grid-background"
import { FeatureCards } from "@/components/feature-cards"
import { DiscordBanner } from "@/components/discord-banner"
import { MagnifyDock } from "@/components/magnify-dock"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <DotGridBackground />

      <div className="relative z-10 flex flex-col pb-32">
        <nav className="flex items-center justify-between px-6 py-6 md:px-12">
          <Link href="/" className="text-lg font-medium tracking-tight text-foreground/90">
            Bandit Project
          </Link>
          <div className="hidden gap-8 md:flex">
            <Link href="/stuff" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Stuff
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/socials" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Socials
            </Link>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-primary/40 bg-primary/20 px-5 py-2 text-[13px] text-primary transition-colors hover:border-primary/70 hover:bg-primary/35"
          >
            Get in touch
          </Link>
        </nav>

        <section className="flex flex-col items-center justify-center px-4 pb-12 pt-20 text-center">
          <span className="mb-6 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs uppercase tracking-[0.12em] text-primary/80">
            Bandit Project
          </span>
          <h1 className="mb-6 max-w-[700px] text-balance text-4xl font-medium leading-[1.1] tracking-tight text-foreground/90 md:text-6xl">
            Clean <span className="text-primary/85">Webpage</span>
            <br />
            Project
          </h1>
          <p className="mb-10 max-w-[480px] text-pretty text-[17px] leading-relaxed text-muted-foreground">
            Something i been working on.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="rounded-full border border-primary/50 bg-primary/25 px-6 py-3 text-sm text-primary transition-colors hover:bg-primary/40"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-border bg-transparent px-6 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground/75"
            >
              Learn more →
            </Link>
          </div>
        </section>

        <FeatureCards />

        <DiscordBanner />
      </div>

      <MagnifyDock />
    </main>
  )
}
