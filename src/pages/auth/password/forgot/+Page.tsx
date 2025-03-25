import {
  Title,
  Text,
  TextInput,
  Button,
  Group,
  Center,
  Box,
  Alert,
  Stack,
  Anchor,
} from "@mantine/core";
import { TbAlertCircle, TbArrowLeft, TbAt } from "react-icons/tb";
import { passwordRequest } from "@directus/sdk";
import { useData } from "vike-react/useData";
import { z } from "zod";

import directus from "/src/utils/directus";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import InternalLink from "/src/components/core/InternalLink";
import { getPasswordResetUrl } from "/src/utils/constants";
import type { Data } from "./+data";

const schema = z.object({
  email: z.string().email().max(255),
});

const ForgotPassword: React.FC = () => {
  const content = useData<Data>();
  const form = useAsyncForm({
    schema,
    initialValues: {
      email: "",
    },
    action: async ({ email }) => {
      await directus.request(passwordRequest(email, getPasswordResetUrl()));
    },
  });
  return (
    <Stack w={480} gap={0}>
      {form.state !== "submitted" ? (
        <>
          <Title fz="h2" ta="center">
            {content.header}
          </Title>
          <Text c="dimmed" size="sm" ta="center">
            {content.sub_header}
          </Text>
          <FormWrapper
            form={form}
            withBorder
            shadow="md"
            radius="md"
            p="xl"
            my="md"
          >
            <TextInput
              name="email"
              label={content.email.label}
              placeholder={content.email.placeholder}
              leftSection={<TbAt size={16} />}
              required
              {...form.getInputProps("email")}
              autoFocus
            />
            <Group justify="space-between" mt="lg">
              <Anchor component={InternalLink} href="/auth/login" size="sm">
                <Center>
                  <TbArrowLeft size={12} />
                  <Box ml={5}>{content.login_link}</Box>
                </Center>
              </Anchor>
              <Button {...form.submitButtonProps}>
                {content.submit_button}
              </Button>
            </Group>
          </FormWrapper>
        </>
      ) : (
        <Center style={{ minHeight: "2rem" }}>
          <Stack ta="center">
            <Alert
              icon={<TbAlertCircle size={16} />}
              title={content.success_title}
              c="pink"
            >
              {content.success_description}
            </Alert>
            <Anchor component={InternalLink} href="/" c="dimmed" size="sm">
              <Center>
                <TbArrowLeft size={12} />
                <Box ml={5}>{content.home_link}</Box>
              </Center>
            </Anchor>
          </Stack>
        </Center>
      )}
    </Stack>
  );
};

export default ForgotPassword;
