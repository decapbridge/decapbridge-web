import { getDirectusUrl } from "./constants";

const getAvatarUrl = (avatar: string | any) => {
  if (typeof avatar === 'string') {
    return `${getDirectusUrl()}/assets/${avatar}?key=system-medium-cover`;
  }
}

export default getAvatarUrl