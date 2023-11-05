import * as React from "react";
const GrabIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    stroke="white"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-grip-vertical"
  >
    <circle cx={9} cy={12} r={1} />
    <circle cx={9} cy={5} r={1} />
    <circle cx={9} cy={19} r={1} />
    <circle cx={15} cy={12} r={1} />
    <circle cx={15} cy={5} r={1} />
    <circle cx={15} cy={19} r={1} />
  </svg>
);
export default GrabIcon;
