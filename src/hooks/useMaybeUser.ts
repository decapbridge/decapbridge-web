import { useCallback } from "react";
import { readMe } from "@directus/sdk";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import directus, { CustomDirectusUser } from "/src/utils/directus";
import useGlobalData from "./useGlobalData";

const useMaybeUser = () => {
  const { misc } = useGlobalData();
  const fetchUser = useCallback(async () => {
    try {
      if (!(await directus.getToken())) {
        return null;
      }
      return await directus.request(readMe());
    } catch (error) {
      directus.setToken(null);
      notifications.show({
        title: misc.token_expired,
        message: misc.token_expired_message,
      });
      return null;
    }
  }, [misc]);

  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    refetchOnMount: false,
  });
  return {
    user: data as CustomDirectusUser,
    error,
  };
};

export default useMaybeUser;
