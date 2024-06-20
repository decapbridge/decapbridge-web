import {
  Title,
  Text,
  Stack,
  Group,
  Button,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { usePageContext } from "vike-react/usePageContext";
import InternalLink from "/src/components/core/InternalLink";

const ErrorPage: React.FC = () => {
  const { is404, abortStatusCode, abortReason } = usePageContext();
  let message = abortReason as string | undefined;
  if (!message) {
    message = is404 ? "Page not found." : "Something went wrong.";
  }
  return (
    <Stack my="md" align="center">
      <Title>{abortStatusCode ?? (is404 ? 404 : 500)}</Title>
      <Text>{message}</Text>
      <Group>
        <Button
          component={InternalLink}
          justify="start"
          href="/"
          variant="subtle"
          p="xs"
          leftSection={<IconArrowLeft size="1.25rem" />}
        >
          Go back to home page
        </Button>
      </Group>
    </Stack>
  );
};

export default ErrorPage;
