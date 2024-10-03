import type { SVGProps } from 'react';

export const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5203 9.77642C3.94744 9.34929 4.63996 9.34929 5.0671 9.77642L16.5437 21.253L28.0203 9.77642C28.4474 9.34929 29.14 9.34929 29.5671 9.77642C29.9942 10.2036 29.9942 10.8961 29.5671 11.3232L16.5437 24.3466L3.5203 11.3232C3.09317 10.8961 3.09317 10.2036 3.5203 9.77642Z"
      fill="#D2D4DA"
    />
  </svg>
);

export default SvgArrowDown;
