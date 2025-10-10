import { Title, Stack, Center, Loader } from "@mantine/core";

import { usePageContext } from "vike-react/usePageContext";
import { useEffect } from "react";
import { defaultLoginRedirect } from "/src/hooks/useAuthActions";
import directus, { authenticationStorage } from "/src/utils/directus";
import { refresh } from "@directus/sdk";
import { useQueryClient } from "@tanstack/react-query";
import navigate from "/src/utils/navigate";
import useMaybeUser from "/src/hooks/useMaybeUser";

const SsoCallbackPage: React.FC = () => {
  const { urlParsed } = usePageContext();
  const queryClient = useQueryClient();
  const { user } = useMaybeUser();

  useEffect(() => {
    const doLogin = async () => {
      try {
        if (!urlParsed.search.code) {
          throw new Error("Missing refresh_token in URL params");
        }
        const auth = await directus.request(
          refresh({ mode: "json", refresh_token: urlParsed.search.code })
        );
        authenticationStorage.set(auth);
        await queryClient.invalidateQueries({
          queryKey: ["user"],
          refetchType: "all",
        });
      } catch (error) {
        alert((error as any).message ?? "Unexpected error");
      }
    };
    doLogin();
  }, []);

  useEffect(() => {
    const doPageLoad = async () => {
      if (user) {
        if (urlParsed.search["redirect_uri"]) {
          window.location.href = urlParsed.search["redirect_uri"];
        } else {
          await navigate(defaultLoginRedirect);
        }
      }
    };
    doPageLoad();
  }, [user]);

  return (
    <Stack m="auto" maw={420} gap={0}>
      <Title order={2} ta="center">
        Logging you in...
      </Title>
      <Center my="xl">
        <Loader />
      </Center>
    </Stack>
  );
};

export default SsoCallbackPage;
