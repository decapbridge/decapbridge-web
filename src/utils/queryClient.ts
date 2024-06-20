import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: "always",
    },
    queries: {
      networkMode: "always",
    },
  },
});

export default queryClient;
