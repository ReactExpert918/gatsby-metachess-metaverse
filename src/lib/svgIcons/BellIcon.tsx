import React from "react";

export default ({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) => (
  <div className={className || ""} onClick={onClick}>
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.34576 0.0852723C8.80678 0.27762 8.38211 0.669286 8.13766 1.19941C8.02661 1.44018 8.01363 1.56346 7.98918 2.61062L7.96237 3.758L7.47979 3.95196C5.25554 4.84597 3.75253 6.57002 3.15359 8.91439C3.05526 9.29914 3.03879 9.58699 3.00164 11.5713C2.95424 14.0983 2.89831 14.5816 2.52335 15.7031C2.24747 16.5284 2.0923 16.8275 0.957974 18.72C-0.105251 20.4941 -0.131579 20.5641 0.156574 20.8523L0.313304 21.009H9.94485C18.176 21.009 19.5979 20.9979 19.7241 20.9326C19.8763 20.8539 20 20.6495 20 20.4769C20 20.4229 19.5752 19.6699 19.056 18.8036C17.9581 16.9715 17.7013 16.48 17.4501 15.7292C17.0636 14.5744 17.0395 14.3668 16.9944 11.8126C16.951 9.35239 16.94 9.24423 16.6407 8.32705C15.9698 6.27075 14.257 4.51865 12.2922 3.87892L12.0107 3.78723L12.0097 2.86656C12.0083 1.47686 11.8796 1.02755 11.3402 0.530348C10.9688 0.187961 10.5719 0.0255357 10.0535 0.00376449C9.73525 -0.00958777 9.55262 0.0114327 9.34576 0.0852723ZM6.86317 22.0463C6.86317 22.1694 7.37701 22.857 7.64607 23.0939C8.2272 23.6055 8.97653 23.9264 9.73842 23.9899C10.6342 24.0646 11.6153 23.7209 12.3024 23.0917C12.6587 22.7653 13.0831 22.1971 13.0831 22.0464C13.0831 21.9868 12.5424 21.9742 9.97311 21.9742C7.40585 21.9742 6.86317 21.9868 6.86317 22.0463Z"
        fill="url(#paint0_linear_390:230)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_390:230"
          x1="10"
          y1="0"
          x2="10"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#ADA29F" />
          <stop offset="1" stop-color="#6D6461" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);