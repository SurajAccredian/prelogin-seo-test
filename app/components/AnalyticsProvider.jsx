"use client";

import Script from "next/script";
import { useEffect } from "react";
import posthog from "posthog-js";

export default function AnalyticsProvider({ children }) {
  useEffect(() => {
    // PostHog initialization
    posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_API_KEY || "phc_NZdN6nmco27sEhbueOjTabH2ozM8Hq8BJ3l4qH5vUob",
      {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        person_profiles: "identified_only",
      }
    );
  }, []);

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          setTimeout(function () {
            var script = document.createElement("script");
            script.async = true;
            script.src = "https://www.googletagmanager.com/gtag/js?id=G-SWCZ0464KL";
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "G-SWCZ0464KL");
          }, 2000);
        `}
      </Script>

      <Script id="gtm" strategy="afterInteractive">
        {`
          setTimeout(function () {
            (function (w, d, s, l, i) {
              w[l] = w[l] || [];
              w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
              var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
              j.async = true;
              j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
              f.parentNode.insertBefore(j, f);
            })(window, document, "script", "dataLayer", "GTM-W2HX5GJ");
          }, 5000);
        `}
      </Script>

      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          setTimeout(function () {
            !(function (f, b, e, v, n, t, s) {
              if (f.fbq) return;
              n = f.fbq = function () {
                n.callMethod
                  ? n.callMethod.apply(n, arguments)
                  : n.queue.push(arguments);
              };
              if (!f._fbq) f._fbq = n;
              n.push = n;
              n.loaded = !0;
              n.version = "2.0";
              n.queue = [];
              t = b.createElement(e);
              t.async = !0;
              t.src = v;
              s = b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t, s);
            })(
              window,
              document,
              "script",
              "https://connect.facebook.net/en_US/fbevents.js"
            );
            fbq("init", "181911999105692");
            fbq("track", "PageView");
          }, 2000);
        `}
      </Script>

      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          setTimeout(function () {
            window._linkedin_partner_id = "3021458";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

            (function (l) {
              if (!l) {
                window.lintrk = function (a, b) {
                  window.lintrk.q.push([a, b]);
                };
                window.lintrk.q = [];
              }
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";
              b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          }, 2000);
        `}
      </Script>

      <Script id="artibot" strategy="afterInteractive">
        {`
          setTimeout(function () {
            !(function (t, e) {
              t.artibotApi = {
                l: [],
                t: [],
                on: function () {
                  this.l.push(arguments);
                },
                trigger: function () {
                  this.t.push(arguments);
                },
              };
              var a = !1,
                i = e.createElement("script");
              i.async = !0;
              i.type = "text/javascript";
              i.src = "https://app.artibot.ai/loader.js";
              e.getElementsByTagName("head").item(0).appendChild(i);
              i.onreadystatechange = i.onload = function () {
                if (
                  !(
                    a ||
                    (this.readyState &&
                      "loaded" != this.readyState &&
                      "complete" != this.readyState)
                  )
                ) {
                  new window.ArtiBot({
                    i: "be025084-1e64-4136-8dc0-f55f5f6196dd",
                  });
                  a = !0;
                }
              };
            })(window, document);
          }, 2000);
        `}
      </Script>

      <Script id="clarity-script" strategy="afterInteractive">
        {`
          setTimeout(function () {
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "jx18pz9bjk");
          }, 2000);
        `}
      </Script>
      {children}
    </>
  );
}
