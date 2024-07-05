import { usePageContext } from "vike-react/usePageContext";
import AuthenticatedLayout from "/src/components/layouts/AuthenticatedLayout";
import DefaultLayout from "/src/components/layouts/DefaultLayout";
import HeadingSection from "/src/components/misc/HeadingSection";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data } = usePageContext();
  return (
    <DefaultLayout>
      <AuthenticatedLayout>
        {data?.meta?.title && data?.meta?.description && (
          <HeadingSection
            title={data.meta.title}
            description={data.meta.description}
          />
        )}
        {children}
      </AuthenticatedLayout>
    </DefaultLayout>
  );
};

export default DashboardLayout;
