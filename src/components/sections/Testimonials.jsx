const TESTIMONIALS = [
  {
    name: 'David Chen',
    city: 'San Francisco, CA',
    initials: 'DC',
    stars: 5,
    quote:
      "Used the serve drills in my first week and my junior group's engagement doubled. These aren't generic drills — they have court diagrams and coaching cues that actually work.",
  },
  {
    name: 'Marcus Rivera',
    city: 'Austin, TX',
    initials: 'MR',
    stars: 5,
    quote:
      "I've been coaching for 8 years and always struggled with lesson planning. Now I open the platform before every session and I'm done in 5 minutes. My student retention went from 60% to 90%.",
  },
  {
    name: 'Claire Thompson',
    city: 'London, UK',
    initials: 'CT',
    stars: 5,
    quote:
      'The visual court diagrams are a game-changer. I can show my students exactly what the drill looks like on the court — they understand instantly and we spend more time actually playing.',
  },
  {
    name: "James O'Brien",
    city: 'Toronto, Canada',
    initials: 'JO',
    stars: 5,
    quote:
      "Best $27 I've ever spent on coaching resources. The Approach Shot Ladder drill alone transformed how my intermediate players handle mid-court situations.",
  },
  {
    name: 'Sofia Andrade',
    city: 'Miami, FL',
    initials: 'SA',
    stars: 5,
    quote:
      'My junior academy has 3 coaches all using TennisPro now. We run the same drills across groups so our students have a consistent experience no matter who is coaching them.',
  },
]

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Coaches Who Already Made the Switch
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Real results from real coaches using TennisPro in their sessions every week.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, city, initials, stars, quote }) => (
            <div
              key={name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4"
            >
              <StarRating count={stars} />
              <p className="text-slate-700 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">{initials}</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{name}</p>
                  <p className="text-slate-400 text-xs">{city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
