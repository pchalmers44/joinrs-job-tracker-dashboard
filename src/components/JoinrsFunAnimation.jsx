const TONES = {
  purple: {
    bgStops: [
      'rgba(210,165,225,0.98)',
      'rgba(210,165,225,0.86)',
      'rgba(210,165,225,0.96)',
    ],
    accent: 'rgba(175,125,200,0.85)',
  },
  blue: {
    bgStops: ['rgba(0,135,243,0.30)', 'rgba(0,135,243,0.20)', 'rgba(0,135,243,0.28)'],
    accent: 'rgba(0,135,243,0.55)',
  },
  teal: {
    bgStops: ['rgba(15,180,145,0.30)', 'rgba(15,180,145,0.20)', 'rgba(15,180,145,0.28)'],
    accent: 'rgba(15,180,145,0.55)',
  },
  orange: {
    bgStops: ['rgba(250,75,25,0.30)', 'rgba(250,75,25,0.20)', 'rgba(250,75,25,0.28)'],
    accent: 'rgba(250,75,25,0.55)',
  },
}

export default function JoinrsFunAnimation({ size = 56, tone = 'purple' }) {
  const palette = TONES[tone] ?? TONES.purple

  return (
    <div className="jrMascot" style={{ width: size, height: size }} aria-hidden="true">
      <svg
        className="jrMascotSvg"
        viewBox="0 0 100 100"
        role="img"
        focusable="false"
      >
        <defs>
          <linearGradient id="jrMascotBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette.bgStops?.[0]} />
            <stop offset="60%" stopColor={palette.bgStops?.[1]} />
            <stop offset="100%" stopColor={palette.bgStops?.[2]} />
          </linearGradient>

          <clipPath id="jrLeftEyeClip">
            <circle cx="33" cy="44" r="15" />
          </clipPath>
          <clipPath id="jrRightEyeClip">
            <circle cx="67" cy="44" r="15" />
          </clipPath>
        </defs>

        <g className="jrMascotFloat">
          <g className="jrMascotBody">
            <rect
              x="6"
              y="14"
              width="88"
              height="72"
              rx="26"
              fill="url(#jrMascotBg)"
              stroke="rgba(17,27,35,0.10)"
              strokeWidth="2"
            />
          </g>

          <g className="jrMascotEyes">
            <g clipPath="url(#jrLeftEyeClip)">
              <rect
                x="16"
                y="24"
                width="34"
                height="34"
                rx="10"
                fill={palette.accent}
                transform="rotate(12 33 41)"
              />
            </g>
            <g clipPath="url(#jrRightEyeClip)">
              <rect
                x="50"
                y="24"
                width="34"
                height="34"
                rx="10"
                fill={palette.accent}
                transform="rotate(-12 67 41)"
              />
            </g>

            <g className="jrMascotEye jrMascotBlink">
              <circle cx="33" cy="44" r="15" fill="#ffffff" />
              <circle className="jrMascotPupil" cx="33" cy="44" r="7" fill="#212427" />
              <circle cx="30" cy="41" r="2.4" fill="#ffffff" opacity="0.9" />
            </g>

            <g className="jrMascotEye jrMascotBlink">
              <circle cx="67" cy="44" r="15" fill="#ffffff" />
              <circle className="jrMascotPupil" cx="67" cy="44" r="7" fill="#212427" />
              <circle cx="64" cy="41" r="2.4" fill="#ffffff" opacity="0.9" />
            </g>

            <g className="jrMascotGlasses">
              <rect x="16" y="32" width="34" height="26" rx="12" />
              <rect x="50" y="32" width="34" height="26" rx="12" />
              <path d="M49 45 L51 45" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
