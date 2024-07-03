import type { SVGProps } from 'react';

const SvgKakao = (props: SVGProps<SVGSVGElement>) => (
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_1536_1928)">
      <path
        opacity="0.902"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1.84534C4.29 1.84534 0 5.63134 0 8.83434C0 11.2343 1.558 13.3513 3.931 14.6093L2.933 18.2753C2.844 18.6003 3.213 18.8583 3.496 18.6713L7.873 15.7663C8.242 15.8023 8.618 15.8233 9 15.8233C13.97 15.8233 18 12.6943 18 8.83434C18 5.63134 13.97 1.84534 9 1.84534Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1536_1928">
        <rect width="18" height="18" fill="white" transform="translate(0 0.901367)" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgKakao;
