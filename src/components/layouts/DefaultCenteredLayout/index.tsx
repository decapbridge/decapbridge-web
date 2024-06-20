import DefaultLayout from "/src/components/layouts/DefaultLayout";
import CenteredScreenLayout from "/src/components/layouts/CenteredScreenLayout";

interface DefaultCenteredLayoutProps {
  children: React.ReactNode;
}

const DefaultCenteredLayout: React.FC<DefaultCenteredLayoutProps> = ({ children }) => {
  return (
    <DefaultLayout>
      <CenteredScreenLayout>
        {children}
      </CenteredScreenLayout>
    </DefaultLayout>
  );
};

export default DefaultCenteredLayout;
