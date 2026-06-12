"use client"

import { ScrollVelocity } from "@/components/scroll-velocity"

const DISCORD_INVITE = "https://discord.gg/bandit"

export function DiscordBanner() {
  return (
    <section className="relative my-20 w-full overflow-hidden border-y border-primary/20 bg-primary/[0.06] py-10">
      <ScrollVelocity
        texts={["Join the Bandit Discord", "discord.gg/bandit"]}
        velocity={70}
        numCopies={6}
        className="px-4 text-primary/80"
      />

      <div className="mt-8 flex flex-col items-center gap-4 px-4 text-center">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 text-primary"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.317 4.369A19.79 19.79 0 0 0 16.558 3.2a.07.07 0 0 0-.073.035c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.07.07 0 0 0-.073-.034A19.736 19.736 0 0 0 5.681 4.37a.064.064 0 0 0-.03.027C3.044 8.28 2.33 12.087 2.68 15.846a.08.08 0 0 0 .031.054 19.9 19.9 0 0 0 5.993 3.03.07.07 0 0 0 .076-.026c.462-.63.873-1.295 1.226-1.994a.07.07 0 0 0-.038-.097 13.1 13.1 0 0 1-1.872-.892.07.07 0 0 1-.007-.117c.126-.094.252-.192.372-.291a.07.07 0 0 1 .07-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .071.009c.12.099.246.198.373.292a.07.07 0 0 1-.006.117c-.598.349-1.225.645-1.873.891a.07.07 0 0 0-.038.098c.36.698.772 1.362 1.225 1.993a.07.07 0 0 0 .076.027 19.84 19.84 0 0 0 6.002-3.03.07.07 0 0 0 .032-.054c.5-4.346-.838-8.122-3.549-11.45a.06.06 0 0 0-.03-.027ZM8.02 13.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z" />
          </svg>
          <span className="text-sm font-medium uppercase tracking-[0.14em] text-primary/80">
            Bandit Community
          </span>
        </div>
        <p className="max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Hang out, share builds, and stay updated. Everyone is welcome.
        </p>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-primary/50 bg-primary/25 px-6 py-3 text-sm text-primary transition-colors hover:bg-primary/40"
        >
          Join the server
        </a>
      </div>
    </section>
  )
}
