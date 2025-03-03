import { Container, Button, Group, Stack } from "@mantine/core";
import { TbArrowLeft } from "react-icons/tb";
import SiteForm from "/src/pages/dashboard/sites/SiteForm";
import InternalLink from "/src/components/core/InternalLink";

const NewSitePage: React.FC = () => {
  return (
    <Container size="md" my="xl">
      <Stack>
        <Group>
          <Button
            component={InternalLink}
            href="/dashboard/sites"
            variant="subtle"
            size="compact-md"
            leftSection={<TbArrowLeft size="1.25rem" />}
          >
            Back to all sites
          </Button>
        </Group>
        <SiteForm />
      </Stack>
    </Container>
  );
};

export default NewSitePage;
