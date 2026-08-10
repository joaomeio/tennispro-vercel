// Shared presentation constants for drills, used by the library, the category
// screens and the detail modal. Kept out of any single page so the three stay
// visually consistent.

export const LEVEL_STYLES = {
  beginner:     'bg-green-900/60 text-green-300',
  intermediate: 'bg-yellow-900/60 text-yellow-300',
  advanced:     'bg-red-900/60 text-red-300',
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
