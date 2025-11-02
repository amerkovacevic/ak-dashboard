const apps = [
  {
    name: 'Personal Portfolio',
    description: 'A curated snapshot of my projects, values, and story. A glimpse into my work and creative journey.',
    href: 'https://about.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Secret Santa',
    description: 'Smart gift exchange made simple with automatic matching and reminders. Perfect for effortless holiday coordination.',
    href: 'https://santa.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'FM Team Draw',
    description: 'Randomize balanced Football Manager teams for your group saves. Quick, fair, and ready for your next session.',
    href: 'https://fm.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Pickup Soccer',
    description: 'Easily organize games, track attendance, and manage teams. Built for casual players who love consistency.',
    href: 'https://soccer.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Amer Gauntlet',
    description: 'A daily challenge hub of fast, skill-based mini games. Compete, track streaks, and test your focus and reflexes.',
    href: 'https://gauntlet.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Color Crafter',
    description: 'Sleek palette studio that lets you generate, refine, and save color schemes instantly.',
    href: 'https://color.amerkovacevic.com/?colors=0D1B2A-1B263B-415A77-778DA9-E0E1DD&info=hsl',
    status: 'Live',
  },
]

const statusStyles = {
  Live: 'text-success-300 bg-success-950/50 border-success-800/60',
  'In development': 'text-tertiary-300 bg-tertiary-950/40 border-tertiary-800/60',
  'In design': 'text-quaternary-300 bg-quaternary-950/40 border-quaternary-800/60',
  Planning: 'text-warning-300 bg-warning-950/40 border-warning-800/60',
  Concept: 'text-quaternary-300 bg-quaternary-950/40 border-quaternary-800/60',
  'Coming soon': 'text-quaternary-300 bg-secondary-700/60 border-tertiary-800/60',
}

const App = () => {
  return (
    <div className="min-h-screen bg-primary-800">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-16 md:px-12 lg:px-16">
        <header className="flex flex-col gap-6 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-quaternary-400">AK Dashboard</p>
          <h1 className="text-4xl font-bold text-accent-50 sm:text-5xl lg:text-6xl">
            Experiments and everyday tools
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-quaternary-300 md:mx-0">
          A growing space for personal projects, ideas, and utilities that continue to evolve with time.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const isDisabled = Boolean(app.disabled)
            const isExternal = app.href.startsWith('http')
            const statusClass = statusStyles[app.status] ?? 'text-quaternary-300 bg-secondary-700/60 border-tertiary-800/60'

            const cardContent = (
              <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-tertiary-500/30 bg-secondary-700/70 p-6 transition hover:border-tertiary-400/60 hover:bg-secondary-700/80 active:border-tertiary-400/60 active:bg-secondary-700/80">
                <div className="flex flex-col gap-4">
                  <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
                    <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden />
                    {app.status}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-accent-50">{app.name}</h2>
                    <p className="text-sm text-quaternary-300">{app.description}</p>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition touch-manipulation ${
                      isDisabled
                        ? 'cursor-not-allowed bg-secondary-600/80 text-quaternary-400'
                        : 'bg-tertiary-500/20 text-tertiary-300 hover:bg-tertiary-500/30 active:bg-tertiary-500/30'
                    }`}
                  >
                    {isDisabled ? 'Coming Soon' : 'Open App'}
                    {!isDisabled && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75v10.5m0 0h-10.5m10.5 0-12-12" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            )

            return isDisabled ? (
              <article key={app.name} className="h-full opacity-80">
                {cardContent}
              </article>
            ) : (
              <a
                key={app.name}
                href={app.href}
                className="h-full no-underline"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {cardContent}
              </a>
            )
          })}
        </section>
      </div>
      <footer className="w-full border-t border-tertiary-500/30 bg-primary-800/80 py-4 text-center text-xs text-quaternary-500">
        <p>&copy; {new Date().getFullYear()} Amer Kovacevic All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
