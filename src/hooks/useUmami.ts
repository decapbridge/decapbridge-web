/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { usePageContext } from "/src/hooks/usePageContext";

const umamiJsUrl = "https://millisecond-umami.dokku.alexlotte.ca/script.js";
const umamiId = "xxxxxx";

// TODO: use this in the renderHTML function
export const umamiScript = `<script defer src="${umamiJsUrl}" data-website-id="${umamiId}" data-auto-track="false" />`;

export const umamiTrack = (obj?: any, data?: any) => {
  if (typeof window !== "undefined" && (window as any).umami) {
    (window as any).umami.umamiTrack(obj, data);
  }
};

const useUmami = () => {
  const { urlOriginal, data } = usePageContext();

  const trackNavigation = useCallback(() => {
    umamiTrack((props: any) => ({
      ...props,
      url: urlOriginal,
      title: data?.head?.title || props.title,
    }));
  }, [urlOriginal, data]);

  const trackEvent = useCallback(
    (eventName: string, eventPayload: any) => {
      umamiTrack((props: any) => ({
        ...props,
        url: urlOriginal,
        title: data?.head?.title || props.title,
        name: eventName,
        data: eventPayload,
      }));
    },
    [urlOriginal, data]
  );

  return { trackNavigation, trackEvent };
};

export default useUmami;
