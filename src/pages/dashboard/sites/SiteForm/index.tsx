import {
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Text,
  Anchor,
  Title,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem } from "@directus/sdk";
import { z } from "zod";

import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import directus, { Site } from "/src/utils/directus";
import navigate from "/src/utils/navigate";
import onlyDiff from "/src/utils/onlyDiff";
import { IconKey, IconTrash } from "@tabler/icons-react";

interface SiteFormProps {
  initialValues?: Partial<Site>;
}

const schema = z.object({
  repo: z
    .string()
    .regex(/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/)
    .min(3)
    .max(255),
  access_token: z.string().min(3).max(255),
  cms_url: z.string().url().min(3).max(255),
});

const SiteForm: React.FC<SiteFormProps> = ({ initialValues }) => {
  const queryClient = useQueryClient();

  const form = useAsyncForm({
    allowMultipleSubmissions: Boolean(initialValues),
    loadingOverlay: true,
    initialValues: {
      repo: initialValues?.repo ?? "",
      access_token: initialValues?.access_token ?? "",
      cms_url: initialValues?.cms_url ?? "",
    },
    schema,
    action: async (values) => {
      let createdId: null | string = null;
      if (initialValues?.id) {
        await directus.request(
          updateItem("sites", initialValues.id, onlyDiff(initialValues, values))
        );
      } else {
        const createResult = await directus.request(
          createItem("sites", values)
        );
        createdId = createResult.id;
      }
      notifications.show({
        color: "green",
        message: `Site ${initialValues ? "updated" : "created"}!`,
      });
      if (createdId) {
        await navigate(`/dashboard/sites/edit`, {
          queryParams: { tab: "install", siteId: createdId },
        });
      }
      await queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });

  return (
    <FormWrapper form={form} withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>
          {initialValues ? "Edit site settings" : "Add site"}
        </Title>
        <Divider />
        <TextInput
          label="Github repository"
          placeholder="user-or-org/repository-name"
          description="Please provide the repo in the following format: org/repo"
          name="repo"
          {...form.getInputProps("repo")}
          required
          autoComplete="off"
        />
        <Stack gap={2}>
          <PasswordInput
            label="Github access token"
            description={
              <>
                Provide an access token that will let users use the git-gateway.
                <br />
                It needs read-write access this repository's <em>
                  Contents
                </em>{" "}
                and <em>Pull requests</em>.
              </>
            }
            name="access_token"
            {...form.getInputProps("access_token")}
            leftSection={<IconKey size={16} />}
            autoComplete="new-password"
            required
          />
          <Text size="xs" c="dimmed">
            You can create it, track it's usage and revoke it on{" "}
            <Anchor
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github here
            </Anchor>
            . Fine-grained tokens recommended.
          </Text>
        </Stack>
        <TextInput
          label="Decap CMS URL"
          placeholder="https://your-site.com/admin/index.html"
          name="cms_url"
          {...form.getInputProps("cms_url")}
          required
        />
        <Group justify="space-between">
          <Button {...form.submitButtonProps} accessKey="s">
            {initialValues ? "Save changes" : "Create site"}
          </Button>
        </Group>
        {form.errors.action && <Group>{form.errors.action}</Group>}
      </Stack>
    </FormWrapper>
  );
};

export default SiteForm;
