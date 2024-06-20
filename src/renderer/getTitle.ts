import type { PageContext } from "vike/types";

const getTitle = (ctx: PageContext): string => {
  if (ctx.is404) {
    return "404 - Page not found.";
  }
  if (ctx.urlPathname !== "/" && ctx.data?.meta?.title) {
    return ctx.data.meta.title;
  }
  return ctx.global.site.site_title;
};

export default getTitle;
