import { PageShell } from "@/components/page-shell"

const products = [
  { name: "Bandit One", desc: "The flagship build. Clean, fast, and reliable.", tag: "Live" },
  { name: "Bandit Mini", desc: "A lightweight take for smaller projects.", tag: "Live" },
  { name: "LV External", desc: "Something special in the works.", tag: "Soon" },
  { name: "Toolkit", desc: "Helpers and utilities for the whole stack.", tag: "Beta" },
]

export default function ProductsPage() {
  return (
    <PageShell
      eyebrow="Products"
      title={
        <>
          Things i&apos;ve <span className="text-primary/85">built</span>
        </>
      }
      subtitle="A small collection of projects and tools."
    >
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md transition-colors hover:border-primary/40"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-medium text-foreground/90">{p.name}</h3>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-primary/80">
                {p.tag}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
