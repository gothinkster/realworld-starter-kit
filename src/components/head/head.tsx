import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";
import { Analytics } from "./analytics";
import { Social } from "./social";

export const Head = component$(
  () => {
    const head = useDocumentHead();
    const loc = useLocation();

    return (
      <>
        <meta charSet="utf-8" />
        <title>Conduit</title>
        <link
          href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
          rel="stylesheet"
          type="text/css"
        />
        <link rel="stylesheet" href="//demo.productionready.io/main.css" />
        <link rel="canonical" href={loc.href} />

        {head.meta.map((m) => (
          <meta {...m} />
        ))}

        {head.links.map((l) => (
          <link {...l} />
        ))}

        {head.styles.map((s) => (
          <style {...s.props} dangerouslySetInnerHTML={s.style} />
        ))}

        <Social />
        <Analytics loc={loc} />
      </>
    );
  },
  { tagName: "head" }
);
