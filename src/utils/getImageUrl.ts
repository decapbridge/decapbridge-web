import { getDirectusUrl } from "./constants";

const getImageUrl = (fileId: string | any) => {
  if (typeof fileId === "string") {
    return `${getDirectusUrl()}/assets/${fileId}?key=system-medium-cover`;
  }
  return null;
};

export default getImageUrl;
