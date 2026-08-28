// The TennisPro lockup: the "TP" mark, optionally followed by the wordmark.
//
// The mark ships as a transparent PNG (public/brand/logo.png, derived from the
// source export by scripts/generate_logo_assets.mjs) so it reads on the dark
// library surfaces and the white marketing pages alike. Only the wordmark needs
// a colour — pass it through `wordmarkClass`.

const ASPECT = 1017 / 817 // intrinsic ratio of the trimmed mark

export default function Logo({
  size = 28,
  wordmark = true,
  wordmarkClass = 'text-white text-[17px]',
  // `block` puts the lockup on a line of its own — without it the inline-flex
  // wrapper shares a line with whatever inline element follows it.
  block = false,
  className = '',
}) {
  return (
    <span className={`${block ? 'flex' : 'inline-flex'} items-center gap-2 ${className}`}>
      <img
        src="/brand/logo.png"
        alt={wordmark ? '' : 'TennisPro'}
        aria-hidden={wordmark ? true : undefined}
        width={Math.round(size * ASPECT)}
        height={size}
        style={{ height: size, width: 'auto' }}
        className="shrink-0 select-none"
        draggable="false"
      />
      {wordmark && (
        <span className={`font-extrabold tracking-tight leading-none ${wordmarkClass}`}>
          TennisPro
        </span>
      )}
    </span>
  )
}
