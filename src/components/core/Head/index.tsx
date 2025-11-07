import {
  ColorSchemeScript,
  MantineProvider,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";
import type { Config } from "vike/types";
import renderTitle from "/src/renderer/+title";
import getTitle from "/src/renderer/getTitle";
import { theme } from "/src/utils/theme";

const getThumbnailUrl = (props: { title: string; description: string }) => {
  const base = "https://cdn.thumbsmith.com/v1/u/loteoo/decapbridge";
  const url = `${base}?${new URLSearchParams(props).toString()}`;
  return url;
};

const Head: React.FC = () => {
  const pageContext = usePageContext();

  const {
    urlPathname,
    urlOriginal,
    data,
    global: { site },
  } = pageContext;

  const title = getTitle(pageContext);
  const fullTitle = renderTitle(pageContext);
  const description =
    (urlPathname !== "/" && data?.meta?.description) || site.site_description;

  const image = getThumbnailUrl({ title, description });
  const baseUrl = site.site_url;
  const pageUrl = `${baseUrl}${urlOriginal}`;

  const theme = useMantineTheme();
  const themeColor = theme.colors[theme.primaryColor][6];

  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <link rel="icon" href="/favicon.png" type="image/png" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <meta name="theme-color" content={themeColor} />
      <meta name="mobile-web-app-capable" content="yes" />

      <link rel="home" href={baseUrl} />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={site.site_name} />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="apple-mobile-web-app-title" content={fullTitle} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content={themeColor} />
      <link rel="apple-touch-startup-image" href="/icons/icon-192x192.png" />
      <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/icon-180x180.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/icons/icon-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="256x256"
        href="/icons/icon-256x256.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/icons/icon-512x512.png"
      />
      <meta name="msapplication-navbutton-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="msapplication-TileImage" content="/icons/icon-512x512.png" />

      <ColorSchemeScript />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />

      <script
        defer
        src="https://stats.millisecond.studio/script.js"
        data-website-id="7e32f79e-6551-42f4-a09a-fdfb1957714e"
      />

      {colorScheme === "light" ? (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        />
      ) : (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        />
      )}

      <style>{`.hljs { background: var(--ch-background); }`}</style>
    </>
  );
};

const HeadWrapper: Config["Head"] = () => {
  return (
    <MantineProvider theme={theme}>
      <Head />
    </MantineProvider>
  );
};

export default HeadWrapper;
