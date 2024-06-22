import { ColorSchemeScript, MantineThemeProvider, useMantineTheme } from "@mantine/core";
import { usePageContext } from "vike-react/usePageContext";
import renderTitle from "/src/renderer/+title";
import getTitle from "/src/renderer/getTitle";
import { theme } from "/src/utils/theme";

const getThumbnailUrl = (props: { title: string; description: string }) => {
  const base = "https://cdn.thumbsmith.com/v1/u/loteoo/site-starter";
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

  return (
    <>
      <link rel="icon" href="/icons/favicon.svg" />
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

      <meta name="msapplication-navbutton-color" content={themeColor} />
      <meta name="msapplication-TileColor" content={themeColor} />

      <ColorSchemeScript />
    </>
  );
};

const HeadWrapper: React.FC = () => {
  return (
    <MantineThemeProvider theme={theme}>
      <Head />
    </MantineThemeProvider>
  )
}


export default HeadWrapper;
