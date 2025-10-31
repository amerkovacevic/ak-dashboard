const apps = [
  {
    name: 'Personal Portfolio',
    description: 'A snapshot of my work, values, and journey. Hosted at about.amerkovacevic.com.',
    href: 'https://about.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Secret Santa',
    description: 'Effortless gift exchange coordinator with smart matching and reminders.',
    href: 'https://santa.amerkovacevic.com',
    status: 'In development',
  },
  {
    name: 'FM Team Draw',
    description: 'Randomize balanced squads for Football Manager save nights with friends.',
    href: 'https://fm.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Pickup Soccer',
    description: 'Track attendance, manage rosters, and spin up small-sided games on demand.',
    href: 'https://soccer.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Amer Gauntlet',
    description: 'Personal challenge hub for fitness streaks and habit-building experiments.',
    href: 'https://gauntlet.amerkovacevic.com',
    status: 'Live',
  },
  {
    name: 'Future App Slot',
    description: 'Reserved for the next idea—finance tracker, AI assistant, or something new.',
    href: '#',
    status: 'In development',
    disabled: true,
  },
]

const statusStyles = {
  Live: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/60',
  'In development': 'text-sky-300 bg-sky-950/40 border-sky-800/60',
  'In design': 'text-indigo-300 bg-indigo-950/40 border-indigo-800/60',
  Planning: 'text-amber-300 bg-amber-950/40 border-amber-800/60',
  Concept: 'text-fuchsia-300 bg-fuchsia-950/40 border-fuchsia-800/60',
  'Coming soon': 'text-slate-300 bg-slate-900/60 border-slate-800/60',
}

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-16 md:px-12 lg:px-16">
        <header className="flex flex-col gap-6 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-muted">AK Dashboard</p>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Personal mission control for everyday experiments and tools
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-slate-300 md:mx-0">
            Save this hub and return whenever inspiration strikes, new apps will appear here as they come to life.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((app) => {
            const isDisabled = Boolean(app.disabled)
            const isExternal = app.href.startsWith('http')
            const statusClass = statusStyles[app.status] ?? 'text-slate-300 bg-slate-900/60 border-slate-800/60'

            const cardContent = (
              <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur transition hover:border-brand-accent/60 hover:bg-white/10">
                <div className="flex flex-col gap-4">
                  <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
                    <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden />
                    {app.status}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-white">{app.name}</h2>
                    <p className="text-sm text-slate-300">{app.description}</p>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                      isDisabled
                        ? 'cursor-not-allowed bg-slate-800/80 text-slate-400'
                        : 'bg-brand-accent/20 text-brand-accent hover:bg-brand-accent/30'
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

        <footer className="border-t border-white/10 pt-6 text-center text-sm text-slate-400 md:text-left">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <p>&copy; {new Date().getFullYear()} Amer Kovacevic All rights reserved.</p>
                  <div className="flex flex-wrap gap-4">
                    <a className="transition hover:text-sky-400" href="https://www.linkedin.com/in/amerkovacevic" target="_blank" rel="noreferrer">
                      LinkedIn
                    </a>
                    <a className="transition hover:text-sky-400" href="https://www.github.com/amerkovacevic" target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
        </footer>
      </div>
    </div>
  )
}

export default App
