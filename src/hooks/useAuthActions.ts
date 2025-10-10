import { createUser } from "@directus/sdk";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import directus from "/src/utils/directus";
import navigate from "/src/utils/navigate";
import useGlobalData from "./useGlobalData";
import { useCallback } from "react";

export const defaultLoginRedirect = "/dashboard/sites";

interface SignupParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar?: any;
}

const useAuthActions = () => {
  const { misc } = useGlobalData();
  const queryClient = useQueryClient();

  const signup = useCallback(
    async (params: SignupParams) => {
      await directus.request(createUser(params));
      await directus.login({ email: params.email, password: params.password }, { mode: "json" });
      await queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "all",
      });
      await navigate("/dashboard/sites");
    },
    []
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
    signup,
    logout,
  };
};

export default useAuthActions;
