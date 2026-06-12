import { PageShell } from "@/components/page-shell"

const items = [
  { title: "Brand Identity", desc: "Visual systems with depth and character." },
  { title: "UI Design", desc: "Interfaces built for clarity and delight." },
  { title: "Motion", desc: "Animation that adds meaning, not noise." },
  { title: "Experiments", desc: "Random ideas and works in progress." },
  { title: "Writing", desc: "Notes and thoughts on building things." },
  { title: "LV External", desc: "soon..." },
]

export default function StuffPage() {
  return (
    <PageShell
      eyebrow="Stuff"
      title={
        <>
          Random <span className="text-primary/85">stuff</span>
        </>
      }
      subtitle="A grid of bits and pieces."
    >
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-md transition-colors hover:border-primary/40"
          >
            <h3 className="mb-1.5 text-sm font-medium text-foreground/85">{s.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
