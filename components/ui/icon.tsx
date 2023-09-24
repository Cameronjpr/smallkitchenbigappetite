/* eslint-disable @next/next/no-img-element */
export function Icon({
  name,
  tint,
  size = 24,
}: {
  name: string
  tint?: 'white'
  size?: 16 | 24
}) {
  return (
    <img
      loading="lazy"
      src={`/icons/${name}.svg`}
      alt=""
      width={size}
      height={size}
      style={{
        filter:
          tint === 'white'
            ? 'invert(100%) sepia(0%) saturate(7489%) hue-rotate(183deg) brightness(97%) contrast(100%)'
            : undefined,
      }}
    />
  )
}
