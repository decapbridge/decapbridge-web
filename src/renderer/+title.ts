import type { PageContext } from "vike/types";
import getTitle from "./getTitle";

const renderTitle = (ctx: PageContext) =>
  `${getTitle(ctx)} — ${ctx.global.site.site_name}`;

export default renderTitle;
