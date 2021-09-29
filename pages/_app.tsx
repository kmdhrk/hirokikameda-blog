import "../styles/global.scss";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { existsGaId, pageview, GA_ID } from "../libs/gtag";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path) => {
      pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {GA_ID !== undefined && (
        <>
          <Script
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" defer strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());    
              gtag('config', '${GA_ID}');
          `}
          </Script>
        </>
      )}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
