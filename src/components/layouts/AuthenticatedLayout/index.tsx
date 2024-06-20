import { useEffect } from "react";
import { Loader } from "@mantine/core";
import CenteredScreenLayout from "/src/components/layouts/CenteredScreenLayout";
import useMaybeUser from "/src/hooks/useMaybeUser";
import navigate from "/src/utils/navigate";
import { usePageContext } from "vike-react/usePageContext";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  const { user } = useMaybeUser();
  const { urlPathname } = usePageContext();
  useEffect(() => {
    if (user === null) {
      navigate(`/auth/login`, { queryParams: { redirect: urlPathname } });
    }
  }, [user, urlPathname]);
  if (user === undefined || user === null) {
    return (
      <CenteredScreenLayout>
        <Loader size="xl" />
      </CenteredScreenLayout>
    );
  }
  return children;
};

export default AuthenticatedLayout;
