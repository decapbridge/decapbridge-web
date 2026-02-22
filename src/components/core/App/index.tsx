import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import React from "react";
import { Center, MantineProvider } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";
import { Notifications } from "@mantine/notifications";
import {
  CodeHighlightAdapterProvider,
  createHighlightJsAdapter,
} from "@mantine/code-highlight";
import hljs from "highlight.js/lib/core";
import yamlLang from "highlight.js/lib/languages/yaml";
import plaintextLang from "highlight.js/lib/languages/plaintext";
import xmlLang from "highlight.js/lib/languages/xml";

import { QueryClientProvider } from "@tanstack/react-query";
import { usePageContext } from "vike-react/usePageContext";
import type { Config } from "vike/types";
import { Provider } from "jotai";
import SpotlightSearch from "/src/components/core/SpotlightSearch";
import ColorSchemeOverlay from "/src/components/core/ColorSchemeSwitchOverlay";
import { defaultColorScheme } from "/src/utils/constants";
import queryClient from "/src/utils/queryClient";
import { theme } from "/src/utils/theme";
import store from "/src/utils/store";
import HljsCssLoader from "../HljsCssLoader";

hljs.registerLanguage("xml", xmlLang);
hljs.registerLanguage("plaintext", plaintextLang);
hljs.registerLanguage("yaml", yamlLang);

const highlightJsAdapter = createHighlightJsAdapter(hljs);

// Theme deep copy
const sessionTheme = {
  ...theme,
  colors: { ...theme.colors },
  other: { ...theme.other },
};

const App: Config["Wrapper"] = ({ children }) => {
  const { abortStatusCode, urlParsed } = usePageContext();
  const { site_id, site_name, site_color, site_logo } = urlParsed.search;

  let pageContent: React.ReactElement | undefined;

  let pageTheme = theme;
  if (site_id) {
    if (site_name) {
      (sessionTheme.other as any).site_name = site_name;
    }
    if (site_color) {
      sessionTheme.colors = {
        custom: generateColors(site_color),
      };
    }
    if (site_logo) {
      (sessionTheme.other as any).site_logo = site_logo;
    }
    pageTheme = sessionTheme;
  }

  if (abortStatusCode) {
    pageContent = (
      <Center h="90vh" p="xl">
        {children}
      </Center>
    );
  } else {
    pageContent = (
      <>
        {children}
        <SpotlightSearch />
        <ColorSchemeOverlay />
        <Notifications position="top-center" />
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        defaultColorScheme={defaultColorScheme}
        theme={pageTheme}
      >
        <CodeHighlightAdapterProvider adapter={highlightJsAdapter}>
          <HljsCssLoader />
          <Provider store={store}>{pageContent}</Provider>
        </CodeHighlightAdapterProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
