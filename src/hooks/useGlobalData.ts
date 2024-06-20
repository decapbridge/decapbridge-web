import { usePageContext } from "vike-react/usePageContext";

const useGlobalData = () => {
  const { global } = usePageContext();
  return global;
};

export default useGlobalData;
