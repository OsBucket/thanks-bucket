import type { SVGProps } from 'react';

const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <g clipPath="url(#clip0_451_1780)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.71967 0.71967C1.01256 0.426777 1.48744 0.426777 1.78033 0.71967L10 8.93934L18.2197 0.71967C18.5126 0.426777 18.9874 0.426777 19.2803 0.71967C19.5732 1.01256 19.5732 1.48744 19.2803 1.78033L11.0607 10L19.2803 18.2197C19.5732 18.5126 19.5732 18.9874 19.2803 19.2803C18.9874 19.5732 18.5126 19.5732 18.2197 19.2803L10 11.0607L1.78033 19.2803C1.48744 19.5732 1.01256 19.5732 0.71967 19.2803C0.426777 18.9874 0.426777 18.5126 0.71967 18.2197L8.93934 10L0.71967 1.78033C0.426777 1.48744 0.426777 1.01256 0.71967 0.71967Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_451_1780">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgClose;
