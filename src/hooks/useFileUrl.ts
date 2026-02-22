import { useMemo } from "react";
import getImageUrl from "../utils/getImageUrl";

const useFileUrl = (fileValue: string | File | null) => {
  return useMemo(() => {
    if (typeof window !== "undefined" && fileValue instanceof File) {
      return URL.createObjectURL(fileValue);
    }
    if (fileValue) {
      return getImageUrl(fileValue);
    }
    return null;
  }, [fileValue]);
};

export default useFileUrl;
