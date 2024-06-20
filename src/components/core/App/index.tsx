import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/notifications/styles.css";

import React from "react";
import { Center, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { usePageContext } from "vike-react/usePageContext";
import { Provider } from "jotai";
import SpotlightSearch from "/src/components/core/SpotlightSearch";
import ColorSchemeOverlay from "/src/components/core/ColorSchemeSwitchOverlay";
import { defaultColorScheme } from "/src/utils/constants";
import queryClient from "/src/utils/queryClient";
import { theme } from "/src/utils/theme";
import store from "/src/utils/store";

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  const { abortStatusCode } = usePageContext();

  let pageContent: JSX.Element | undefined;

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
      <MantineProvider defaultColorScheme={defaultColorScheme} theme={theme}>
        <Provider store={store}>{pageContent}</Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
