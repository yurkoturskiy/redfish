import React from 'react'

const GitHubIcon = props => (
  <svg width={56} height={55} fill="none" {...props}>
    <g filter="url(#prefix__filter0_d)">
      <path
        d="M28 0C14.748 0 4 10.746 4 24c0 10.604 6.876 19.6 16.414 22.774 1.198.222 1.586-.522 1.586-1.154v-4.468c-6.676 1.452-8.066-2.832-8.066-2.832-1.092-2.774-2.666-3.512-2.666-3.512-2.178-1.49.166-1.458.166-1.458 2.41.168 3.678 2.474 3.678 2.474 2.14 3.668 5.614 2.608 6.984 1.994.214-1.55.836-2.61 1.524-3.208-5.33-.61-10.934-2.668-10.934-11.862 0-2.622.938-4.762 2.472-6.442-.248-.606-1.07-3.048.234-6.352 0 0 2.016-.644 6.602 2.46 1.914-.532 3.966-.798 6.006-.808 2.04.01 4.094.276 6.012.808 4.582-3.104 6.594-2.46 6.594-2.46 1.306 3.306.484 5.748.236 6.352 1.54 1.68 2.47 3.822 2.47 6.442 0 9.218-5.614 11.248-10.958 11.842.86.744 1.646 2.204 1.646 4.444v6.586c0 .638.384 1.388 1.602 1.152C45.132 43.594 52 34.6 52 24 52 10.746 41.254 0 28 0z"
        fill="#FF4A64"
      />
    </g>
    <defs>
      <filter
        id="prefix__filter0_d"
        x={0}
        y={0}
        width={56}
        height={56}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)

export default GitHubIcon
