// Shared presentation constants for drills, used by the library, the category
// screens and the detail modal. Kept out of any single page so the three stay
// visually consistent.

export const LEVEL_STYLES = {
  beginner:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25',
  intermediate: 'bg-amber-500/10 text-amber-400 border border-amber-500/25',
  advanced:     'bg-rose-500/10 text-rose-400 border border-rose-500/25',
}

// Dot colours for the compact level indicator on drill cards.
export const LEVEL_DOTS = {
  beginner:     'bg-green-400',
  intermediate: 'bg-yellow-400',
  advanced:     'bg-red-400',
}

export const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced']

export const TYPE_LABELS = {
  groundstrokes: 'Groundwork',
  serve:         'Serve',
  volley:        'Volley',
  return:        'Return',
  footwork:      'Footwork',
  fitness:       'Fitness',
  matchplay:     'Match Play',
  dropshot:      'Dropshot & Lob',
}

export const TYPE_ORDER = [
  'groundstrokes', 'serve', 'volley', 'return',
  'footwork', 'fitness', 'matchplay', 'dropshot',
]
