import * as React from "react";
const HtmlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    className="file-type-icon"
    viewBox="0 0 15 15"
    width="1em"
    height="1em"
  >
    <rect width={15} height={15} fill="#FF3C41" rx={4} />
    <path
      fill="#28282B"
      d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
    />
  </svg>
);
export default HtmlIcon;
