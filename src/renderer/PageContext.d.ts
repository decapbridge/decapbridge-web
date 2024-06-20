import type { PageData } from "/src/utils/types";
import type { GlobalData } from "/src/renderer/+onBeforeRender";

// https://vike.dev/pageContext#typescript
declare global {
  namespace Vike {
    interface PageContext {
      Page: () => React.ReactElement;
      data: PageData;
      global: GlobalData;
    }
  }
}
