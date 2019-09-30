import React from 'react'

const TwitterIcon = props => (
  <svg width={56} height={52} fill="none" {...props}>
    <g clipPath="url(#prefix__clip0)" filter="url(#prefix__filter0_d)">
      <path d="M52 9.114a19.661 19.661 0 0 1-5.656 1.55 9.864 9.864 0 0 0 4.33-5.448 19.727 19.727 0 0 1-6.254 2.39 9.831 9.831 0 0 0-7.188-3.11c-6.358 0-11.03 5.932-9.594 12.09-8.182-.41-15.438-4.33-20.296-10.288-2.58 4.426-1.338 10.216 3.046 13.148a9.806 9.806 0 0 1-4.458-1.232c-.108 4.562 3.162 8.83 7.898 9.78a9.87 9.87 0 0 1-4.448.168A9.855 9.855 0 0 0 18.58 35 19.8 19.8 0 0 1 4 39.08a27.878 27.878 0 0 0 15.096 4.424c18.284 0 28.614-15.442 27.99-29.292A20.049 20.049 0 0 0 52 9.114z" />
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
      <clipPath id="prefix__clip0">
        <path fill="#fff" transform="translate(4)" d="M0 0h48v48H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default TwitterIcon
