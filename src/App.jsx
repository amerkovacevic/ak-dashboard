import { useState, useEffect, useRef } from 'react'
import lastUpdatedData from './data/lastUpdated.json'

const appsData = [
  {
    id: 1,
    name: 'Personal Portfolio',
    description: 'A curated snapshot of my projects, values, and story. A glimpse into my work and creative journey.',
    href: 'https://about.amerkovacevic.com',
    status: 'Live',
    category: 'Portfolio',
    color: '#14b8a6', // teal
    githubRepo: 'amerkovacevic/personal-portfolio',
  },
  {
    id: 2,
    name: 'Secret Santa',
    description: 'Smart gift exchange made simple with automatic matching and reminders. Perfect for effortless holiday coordination.',
    href: 'https://santa.amerkovacevic.com',
    status: 'Live',
    category: 'Social',
    color: '#ef4444', // red
    githubRepo: 'amerkovacevic/secret-santa',
  },
  {
    id: 3,
    name: 'FM Team Draw',
    description: 'Randomize balanced Football Manager teams for your group saves. Quick, fair, and ready for your next session.',
    href: 'https://fm.amerkovacevic.com',
    status: 'Live',
    category: 'Gaming',
    color: '#8b5cf6', // purple
    githubRepo: 'amerkovacevic/fm-team-draw',
  },
  {
    id: 4,
    name: 'Pickup Soccer',
    description: 'Easily organize games, track attendance, and manage teams. Built for casual players who love consistency.',
    href: 'https://soccer.amerkovacevic.com',
    status: 'Live',
    category: 'Sports',
    color: '#22c55e', // green
    githubRepo: 'amerkovacevic/pickup-soccer',
  },
  {
    id: 5,
    name: 'Amer Gauntlet',
    description: 'A daily challenge hub of fast, skill-based mini games. Compete, track streaks, and test your focus and reflexes.',
    href: 'https://gauntlet.amerkovacevic.com',
    status: 'Live',
    category: 'Gaming',
    color: '#f59e0b', // amber
    githubRepo: 'amerkovacevic/amer-gauntlet',
  },
  {
    id: 6,
    name: 'Color Crafter',
    description: 'Sleek palette studio that lets you generate, refine, and save color schemes instantly.',
    href: 'https://color.amerkovacevic.com/?colors=0D1B2A-1B263B-415A77-778DA9-E0E1DD&info=hsl',
    status: 'Live',
    category: 'Design Tool',
    color: '#ec4899', // pink
    githubRepo: 'amerkovacevic/color-crafter',
  },
  {
    id: 7,
    name: 'Encryption Suite',
    description: 'A comprehensive encryption toolkit with 9 cipher methods, real-time processing, and educational cryptanalysis tools.',
    href: 'https://crypt.amerkovacevic.com',
    status: 'Live',
    category: 'Security Tool',
    color: '#3b82f6', // blue
    githubRepo: 'amerkovacevic/encryption',
  },
  {
    id: 8,
    name: 'Time Bro',
    description: 'Add cities, visualize overlapping hours, and find the perfect meeting time at a glance.',
    href: 'https://time.amerkovacevic.com',
    status: 'Live',
    category: 'Productivity',
    color: '#06b6d4', // cyan
    githubRepo: 'amerkovacevic/time-buddy',
  },
  {
    id: 9,
    name: 'Flick Feed',
    description: 'A modern social platform that lets users log, rate, and share movies and shows they have watched, built for clean visuals and effortless discovery.',
    href: 'https://flick.amerkovacevic.com',
    status: 'Live',
    category: 'Social',
    color: '#a855f7', // purple
    githubRepo: 'amerkovacevic/flickfeed',
  },
  {
    id: 10,
    name: 'Diff Bro',
    description: 'A diff checker for pasted text. Compare two text blocks side-by-side and see exactly what changed.',
    href: '#',
    status: 'Planning',
    category: 'Developer Tool',
    color: '#10b981', // emerald
    githubRepo: 'amerkovacevic/diff-bro',
    disabled: true,
  },
  {
    id: 11,
    name: 'Fullporter',
    description: 'A paper trading app to practice stock market strategies without risking real money. Track your portfolio and test your skills.',
    href: '#',
    status: 'Planning',
    category: 'Finance',
    color: '#eab308', // yellow
    githubRepo: 'amerkovacevic/fullporter',
    disabled: true,
  },
]

// Featured apps - hardcoded to these 3 specific apps
const featuredAppNames = ['Personal Portfolio', 'Flick Feed', 'Amer Gauntlet']

// Merge GitHub commit data with app data
const appsWithCommitData = appsData.map(app => {
  const commitData = lastUpdatedData.commits[app.name]
  return {
    ...app,
    lastUpdated: commitData ? commitData.date.split('T')[0] : app.lastUpdated || new Date().toISOString().split('T')[0],
    lastCommitSha: commitData?.sha,
    lastCommitMessage: commitData?.message,
  }
})

const statusStyles = {
  Live: 'text-success-300 bg-success-950/50 border-success-800/60',
  'In development': 'text-tertiary-300 bg-tertiary-950/40 border-tertiary-800/60',
  'In design': 'text-quaternary-300 bg-quaternary-950/40 border-quaternary-800/60',
  Planning: 'text-warning-300 bg-warning-950/40 border-warning-800/60',
  Concept: 'text-quaternary-300 bg-quaternary-950/40 border-quaternary-800/60',
  'Coming soon': 'text-quaternary-300 bg-secondary-700/60 border-tertiary-800/60',
}

const categories = ['All', 'Portfolio', 'Social', 'Gaming', 'Sports', 'Design Tool', 'Security Tool', 'Productivity', 'Developer Tool', 'Finance']
const statuses = ['All', 'Live', 'In development', 'In design', 'Planning']

const App = () => {
  const [apps, setApps] = useState(appsWithCommitData)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // grid, list, compact
  const [showStats, setShowStats] = useState(true)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const cardsRef = useRef([])

  // Load preferences from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('dashboardViewMode')
    if (savedViewMode) setViewMode(savedViewMode)
    
    const savedShowStats = localStorage.getItem('dashboardShowStats')
    if (savedShowStats !== null) setShowStats(JSON.parse(savedShowStats))
  }, [])

  // Save view mode preference
  useEffect(() => {
    localStorage.setItem('dashboardViewMode', viewMode)
  }, [viewMode])

  // Save stats preference
  useEffect(() => {
    localStorage.setItem('dashboardShowStats', JSON.stringify(showStats))
  }, [showStats])

  // Filter apps
  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || app.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get featured apps - hardcoded specific apps
  const featuredApps = apps.filter(app => featuredAppNames.includes(app.name))

  // Get recently updated apps
  const recentlyUpdatedApps = [...apps]
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 3)

  // Calculate statistics
  const stats = {
    total: apps.length,
    live: apps.filter(app => app.status === 'Live').length,
    inDev: apps.filter(app => app.status === 'In development').length,
  }

  // Swipe handling for mobile
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe || isRightSwipe) {
      // Cycle through view modes on swipe
      const modes = ['grid', 'list', 'compact']
      const currentIndex = modes.indexOf(viewMode)
      const nextIndex = isLeftSwipe 
        ? (currentIndex + 1) % modes.length 
        : (currentIndex - 1 + modes.length) % modes.length
      setViewMode(modes[nextIndex])
    }
  }


  // Render app card
  const renderAppCard = (app, index) => {
    const isDisabled = Boolean(app.disabled)
    const isExternal = app.href.startsWith('http')
    const statusClass = statusStyles[app.status] ?? 'text-quaternary-300 bg-secondary-700/60 border-tertiary-800/60'
    
    const isNew = (Date.now() - new Date(app.lastUpdated)) / (1000 * 60 * 60 * 24) < 7 // Within 7 days

    const cardClasses = {
      grid: "flex h-full flex-col justify-between gap-6 rounded-2xl border border-tertiary-500/30 bg-secondary-700/70 p-6 transition-all duration-300 hover:border-tertiary-400/60 hover:bg-secondary-700/80 hover:scale-105 hover:shadow-lg active:border-tertiary-400/60 active:bg-secondary-700/80",
      list: "flex flex-row items-center gap-6 rounded-xl border border-tertiary-500/30 bg-secondary-700/70 p-4 transition-all duration-300 hover:border-tertiary-400/60 hover:bg-secondary-700/80 hover:translate-x-1",
      compact: "flex items-center gap-4 rounded-lg border border-tertiary-500/30 bg-secondary-700/70 p-3 transition-all duration-300 hover:border-tertiary-400/60 hover:bg-secondary-700/80"
    }

    const cardContent = (
      <div 
        ref={el => cardsRef.current[index] = el}
        className={cardClasses[viewMode]}
        style={{
          borderLeftColor: app.color,
          borderLeftWidth: viewMode !== 'grid' ? '4px' : undefined,
          animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
        }}
      >
        {viewMode === 'grid' && (
          <>
            <div className="flex flex-col gap-4">
              {/* Color indicator for grid view */}
              <div 
                className="h-1 w-full rounded-full"
                style={{ backgroundColor: app.color }}
              />
              
              <div className="flex items-start justify-between gap-2">
                <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
                  <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden />
                  {app.status}
                </div>
                {isNew && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-500/20 px-2 py-1 text-xs font-semibold text-tertiary-300">
                    NEW
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-accent-50">{app.name}</h2>
                <p className="text-xs text-tertiary-400 uppercase tracking-wide">{app.category}</p>
                <p className="text-sm text-quaternary-300">{app.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-quaternary-500">
                Updated {new Date(app.lastUpdated).toLocaleDateString()}
              </span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </span>
            </div>
          </>
        )}

        {viewMode === 'list' && (
          <>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold text-accent-50">{app.name}</h2>
                {isNew && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-tertiary-500/20 px-2 py-1 text-xs font-semibold text-tertiary-300">
                    NEW
                  </span>
                )}
              </div>
              <p className="text-xs text-tertiary-400 uppercase tracking-wide">{app.category}</p>
              <p className="text-sm text-quaternary-300">{app.description}</p>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
                <span className="inline-block h-2 w-2 rounded-full bg-current" aria-hidden />
                {app.status}
              </div>
              <span className="text-xs text-quaternary-500">
                {new Date(app.lastUpdated).toLocaleDateString()}
              </span>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition touch-manipulation ${
                  isDisabled
                    ? 'cursor-not-allowed bg-secondary-600/80 text-quaternary-400'
                    : 'bg-tertiary-500/20 text-tertiary-300 hover:bg-tertiary-500/30 active:bg-tertiary-500/30'
                }`}
              >
                {isDisabled ? 'Coming Soon' : 'Open'}
                {!isDisabled && (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </span>
            </div>
          </>
        )}

        {viewMode === 'compact' && (
          <>
            <div className="flex-1 flex items-center gap-4">
              <h3 className="text-lg font-semibold text-accent-50 flex items-center gap-2">
                {app.name}
                {isNew && (
                  <span className="inline-flex items-center rounded-full bg-tertiary-500/20 px-2 py-0.5 text-xs font-semibold text-tertiary-300">
                    NEW
                  </span>
                )}
              </h3>
              <span className="text-xs text-tertiary-400 uppercase tracking-wide">{app.category}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${statusClass}`}>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                {app.status}
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition touch-manipulation ${
                  isDisabled
                    ? 'cursor-not-allowed bg-secondary-600/80 text-quaternary-400'
                    : 'bg-tertiary-500/20 text-tertiary-300 hover:bg-tertiary-500/30 active:bg-tertiary-500/30'
                }`}
              >
                {isDisabled ? 'Soon' : 'Open'}
                {!isDisabled && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </span>
            </div>
          </>
        )}
      </div>
    )

    return isDisabled ? (
      <article key={app.id} className="opacity-80">
        {cardContent}
      </article>
    ) : (
      <a
        key={app.id}
        href={app.href}
        className="no-underline block"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {cardContent}
      </a>
    )
  }

  return (
    <div className="min-h-screen bg-primary-800">
      {/* Add CSS animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-8 md:gap-12 md:px-8 lg:px-12 md:py-12">
        {/* Header */}
        <header className="flex flex-col gap-6 text-center md:text-left" style={{ animation: 'fadeIn 0.8s ease-out' }}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-quaternary-400">AK Dashboard</p>
            <h1 className="text-3xl font-bold text-accent-50 sm:text-4xl lg:text-5xl mt-2">
              Experiments and everyday tools
            </h1>
          </div>
          
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-quaternary-300 md:mx-0">
            A growing space for personal projects, ideas, and utilities that continue to evolve with time.
          </p>
        </header>

        {/* Statistics Dashboard */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
            <div className="bg-secondary-700/70 border border-tertiary-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-accent-50">{stats.total}</div>
              <div className="text-xs text-quaternary-400 uppercase tracking-wide mt-1">Total Apps</div>
            </div>
            <div className="bg-secondary-700/70 border border-success-800/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-success-300">{stats.live}</div>
              <div className="text-xs text-quaternary-400 uppercase tracking-wide mt-1">Live</div>
            </div>
            <div className="bg-secondary-700/70 border border-tertiary-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-tertiary-300">{stats.inDev}</div>
              <div className="text-xs text-quaternary-400 uppercase tracking-wide mt-1">In Development</div>
            </div>
          </div>
        )}


        {/* Search and Filters */}
        <div className="flex flex-col gap-4" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search apps, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-secondary-700/70 border border-tertiary-500/30 rounded-xl text-accent-50 placeholder:text-quaternary-500 focus:border-tertiary-400/60 focus:outline-none transition"
              />
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-secondary-700/70 border border-tertiary-500/30 rounded-xl p-1.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-tertiary-600 text-accent-50' : 'text-quaternary-400 hover:text-accent-50'}`}
                title="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-lg transition ${viewMode === 'list' ? 'bg-tertiary-600 text-accent-50' : 'text-quaternary-400 hover:text-accent-50'}`}
                title="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`px-3 py-2 rounded-lg transition ${viewMode === 'compact' ? 'bg-tertiary-600 text-accent-50' : 'text-quaternary-400 hover:text-accent-50'}`}
                title="Compact view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Category filters */}
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${
                  selectedCategory === cat
                    ? 'bg-tertiary-600 text-accent-50'
                    : 'bg-secondary-700/70 text-quaternary-300 hover:text-accent-50 border border-tertiary-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
            
            <div className="w-px bg-tertiary-500/30 mx-1" />
            
            {/* Status filters */}
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition ${
                  selectedStatus === status
                    ? 'bg-tertiary-600 text-accent-50'
                    : 'bg-secondary-700/70 text-quaternary-300 hover:text-accent-50 border border-tertiary-500/30'
                }`}
              >
                {status}
              </button>
            ))}
            
            {/* Toggle stats */}
            <button
              onClick={() => setShowStats(!showStats)}
              className="ml-auto px-3 py-1.5 text-xs font-medium rounded-full bg-secondary-700/70 text-quaternary-300 hover:text-accent-50 border border-tertiary-500/30 transition"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
          </div>
        </div>

        {/* Featured Apps Section */}
        {featuredApps.length > 0 && selectedCategory === 'All' && selectedStatus === 'All' && !searchQuery && (
          <section style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-accent-50">Featured Apps</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredApps.map((app, index) => renderAppCard(app, index))}
            </div>
          </section>
        )}

        {/* Recently Updated Section */}
        {recentlyUpdatedApps.length > 0 && selectedCategory === 'All' && selectedStatus === 'All' && !searchQuery && (
          <section style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold text-accent-50">Recently Updated</h2>
              <span className="text-tertiary-400 text-sm">Last 3 updates</span>
            </div>
            <div className="space-y-3">
              {recentlyUpdatedApps.map((app, index) => (
                <div key={app.id} className="flex items-center gap-4 bg-secondary-700/70 border border-tertiary-500/30 rounded-xl p-4">
                  <div 
                    className="w-1 h-12 rounded-full"
                    style={{ backgroundColor: app.color }}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-accent-50">{app.name}</h3>
                    <p className="text-xs text-quaternary-400">{app.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-accent-50">
                      {new Date(app.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs text-quaternary-500">
                      {Math.ceil((Date.now() - new Date(app.lastUpdated)) / (1000 * 60 * 60 * 24))} days ago
                    </div>
                  </div>
                  <a
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-tertiary-500/20 text-tertiary-300 rounded-full text-sm hover:bg-tertiary-500/30 transition"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Apps Section */}
        <section 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-accent-50">
              {searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All' ? 'Filtered Apps' : 'All Apps'}
              <span className="text-quaternary-400 text-base ml-3">({filteredApps.length})</span>
            </h2>
          </div>
          
          {filteredApps.length === 0 ? (
            <div className="text-center py-16 bg-secondary-700/70 border border-tertiary-500/30 rounded-2xl">
              <p className="text-xl text-quaternary-400 mb-2">No apps found</p>
              <p className="text-sm text-quaternary-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' :
              viewMode === 'list' ? 'space-y-4' :
              'space-y-2'
            }>
              {filteredApps.map((app, index) => renderAppCard(app, index))}
            </div>
          )}
        </section>
      </div>

      <footer className="w-full border-t border-tertiary-500/30 bg-primary-800/80 py-4 text-center text-xs text-quaternary-500">
        <p>&copy; {new Date().getFullYear()} Amer Kovacevic All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
