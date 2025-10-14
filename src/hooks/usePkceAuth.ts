import { usePageContext } from "vike-react/usePageContext";
import { getDirectusUrl } from "../utils/constants";
import { useCallback, useEffect } from "react";
import { navigate } from "vike/client/router";
import directus, { authenticationStorage } from "../utils/directus";
import { defaultLoginRedirect } from "./useAuthActions";
import useMaybeUser from "./useMaybeUser";

// This is specifically for login page
const usePkceAuth = () => {
  const { urlParsed } = usePageContext();

  const isPkceFlow =
    urlParsed.search["site_id"] &&
    urlParsed.search["state"] &&
    urlParsed.search["redirect_uri"];

  const { user } = useMaybeUser();

  useEffect(() => {
    const doPageLoad = async () => {
      if (user) {
        if (isPkceFlow) {
          await directus.refresh();
          const auth = await authenticationStorage.get();
          if (!auth) {
            throw new Error("Error loging in."); // TODO improve this
          }
          const token = auth["refresh_token"];
          const pckeRedirect = `${urlParsed.search.redirect_uri}?state=${urlParsed.search.state}&code=${token}`;
          window.location.href = pckeRedirect;
        } else {
          await navigate(defaultLoginRedirect);
        }
      }
    };
    doPageLoad();
  }, [user]);

  let ssoRedirectUrl = `${getDirectusUrl()}/sso-exchange-token`;
  if (isPkceFlow) {
    ssoRedirectUrl = `${getDirectusUrl()}/sites/${urlParsed.search["site_id"]
      }/sso-callback?state=${urlParsed.search.state}`;
  }

  const getSsoRedirectUrl = useCallback((provider: string) => {
    return `${getDirectusUrl()}/auth/login/${provider}?redirect=${encodeURIComponent(
      ssoRedirectUrl
    )}`
  }, [ssoRedirectUrl])

  return {
    isPkceFlow,
    getSsoRedirectUrl
  }

}

export default usePkceAuth;