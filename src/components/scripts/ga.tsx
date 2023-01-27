import React from "react";
import Script from "next/script";

export const GoogleAnalytics = () => {
  return (
    <>
      <Script id="load-gtm" strategy="lazyOnload">{`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-PW9HB82');
      `}</Script>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-PW9HB82"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (
  action: string,
  category: string,
  label: string,
  value: string
) => {
  (window as any)?.gtag?.("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
