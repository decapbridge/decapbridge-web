import { usePageContext } from "vike-react/usePageContext";
import { createUser } from "@directus/sdk";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import { PossibleLinks } from "/src/utils/types";
import directus from "/src/utils/directus";
import navigate from "/src/utils/navigate";
import useGlobalData from "./useGlobalData";
import { useCallback } from "react";

const defaultLoginRedirect = "/dashboard/sites";

interface SignupParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar?: any;
}

const useAuthActions = () => {
  const { urlParsed } = usePageContext();
  const { misc } = useGlobalData();
  const queryClient = useQueryClient();

  const login = useCallback(
    async (email: string, password: string, paramRedirect?: PossibleLinks) => {
      await directus.login({ email, password }, { mode: "json" });
      await queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "all",
      });
      const queryRedirect = urlParsed?.search?.redirect as PossibleLinks;
      await navigate(paramRedirect ?? queryRedirect ?? defaultLoginRedirect);
    },
    [queryClient, urlParsed?.search?.redirect]
  );

  const signup = useCallback(
    async (params: SignupParams) => {
      await directus.request(createUser(params));
      await login(params.email, params.password, "/dashboard/sites");
    },
    [login]
  );

  const logout = useCallback(async () => {
    await directus.logout();
    await queryClient.invalidateQueries({
      queryKey: ["user"],
      refetchType: "all",
    });
    await queryClient.clear();
    notifications.show({
      color: "green",
      message: misc.logged_out_success,
    });
  }, [queryClient, misc.logged_out_success]);

  return {
    login,
    signup,
    logout,
  };
};

export default useAuthActions;
