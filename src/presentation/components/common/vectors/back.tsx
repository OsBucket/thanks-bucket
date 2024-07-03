import type { SVGProps } from 'react';

const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.3025 0.697573C14.6076 1.00267 14.6076 1.49733 14.3025 1.80243L6.10497 10L14.3025 18.1976C14.6076 18.5027 14.6076 18.9973 14.3025 19.3024C13.9974 19.6075 13.5028 19.6075 13.1977 19.3024L3.89526 10L13.1977 0.697573C13.5028 0.392476 13.9974 0.392476 14.3025 0.697573Z"
      fill="black"
    />
  </svg>
);

export default SvgBack;
