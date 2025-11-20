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
  Radio,
  Code,
  SimpleGrid,
  Image,
  Card,
  List,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { createItem, updateItem } from "@directus/sdk";
import { z } from "zod";

import useAsyncForm, {
  FormWrapper,
  accessTokenError,
  repoError,
} from "/src/hooks/useAsyncForm";
import directus, { Site } from "/src/utils/directus";
import navigate from "/src/utils/navigate";
import onlyDiff from "/src/utils/onlyDiff";
import { TbKey, TbX } from "react-icons/tb";
import capitalize from "/src/utils/capitalize";
import { Carousel } from "@mantine/carousel";

interface SiteFormProps {
  initialValues?: Partial<Site>;
}

const schema = z.object({
  git_provider: z.enum(["github", "gitlab"]),
  repo: z
    .string()
    .regex(/^[a-zA-Z0-9-_.]+\/[a-zA-Z0-9-_.]+$/, {
      error: "Invalid string: must match pattern: org/repo",
    })
    .min(3)
    .max(255),
  access_token: z.string().min(3).max(255),
  cms_url: z.url().max(255),
  auth_type: z.enum(["classic", "pkce"]),
});

const SiteForm: React.FC<SiteFormProps> = ({ initialValues }) => {
  const queryClient = useQueryClient();

  const form = useAsyncForm({
    validateInputOnBlur: true,
    allowMultipleSubmissions: Boolean(initialValues),
    loadingOverlay: true,
    initialValues: {
      git_provider: initialValues?.git_provider ?? "github",
      repo: initialValues?.repo ?? "",
      access_token: initialValues?.access_token ?? "",
      cms_url: initialValues?.cms_url ?? "",
      auth_type: initialValues?.auth_type ?? "pkce",
    },
    schema,
    action: async (values) => {
      if (!values.access_token.startsWith("encrypted_")) {
        if (values.git_provider === "github") {
          // Validate the access token
          const tokenValidationResponse = await fetch(
            "https://api.github.com/user",
            {
              headers: {
                Authorization: `Bearer ${values.access_token}`,
              },
            }
          );
          if (!tokenValidationResponse.ok) {
            throw { errors: [new Error(accessTokenError)] };
          }
          // Validate the repository
          const repoValidationResponse = await fetch(
            `https://api.github.com/repos/${values.repo}`,
            {
              headers: {
                Authorization: `Bearer ${values.access_token}`,
              },
            }
          );
          if (!repoValidationResponse.ok) {
            throw { errors: [new Error(repoError)] };
          }
        } else if (values.git_provider === "gitlab") {
          // Validate the access token
          const tokenValidationResponse = await fetch(
            "https://gitlab.com/api/v4/user",
            {
              headers: {
                Authorization: `Bearer ${values.access_token}`,
              },
            }
          );
          if (!tokenValidationResponse.ok) {
            throw { errors: [new Error(accessTokenError)] };
          }
          // Validate the repository
          const repoValidationResponse = await fetch(
            `https://gitlab.com/api/v4/projects/${encodeURIComponent(
              values.repo
            )}`,
            {
              headers: {
                Authorization: `Bearer ${values.access_token}`,
              },
            }
          );
          if (!repoValidationResponse.ok) {
            throw { errors: [new Error(repoError)] };
          }
        }
      }

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

  const canEditAccessToken = Boolean(
    !initialValues?.access_token || form.isDirty("access_token")
  );

  const gitProvider = capitalize(form.values.git_provider);

  const tokenLink =
    form.values.git_provider === "github"
      ? "https://github.com/settings/tokens"
      : form.isValid("repo")
      ? `https://gitlab.com/${form.values.repo}/-/settings/access_tokens`
      : null;

  return (
    <FormWrapper form={form} withBorder radius="lg" p="xl" shadow="md">
      <Stack>
        <Title order={4}>
          {initialValues ? "Edit site settings" : "Add site"}
        </Title>
        <Divider />
        <Radio.Group
          label="Git provider"
          description="Select your git provider for this site."
          {...form.getInputProps("git_provider")}
        >
          <Group pt="xs">
            <Radio label="Github" value="github" />
            <Radio label="Gitlab" value="gitlab" />
          </Group>
        </Radio.Group>
        <TextInput
          label={`${gitProvider} repository`}
          placeholder="user-or-org/repository-name"
          description="Please provide the repo in the following format: org/repo"
          name="repo"
          {...form.getInputProps("repo")}
          required
          autoComplete="off"
        />
        <Stack gap={2}>
          <PasswordInput
            key={String(canEditAccessToken)}
            label={`${gitProvider} access token`}
            placeholder={`${
              form.values.git_provider === "github" ? "github_pat_" : "glpat-"
            }************`}
            description={
              <>
                Provide an access token that will let users use the git-gateway.
                <br />
                {form.values.git_provider === "github" ? (
                  <>
                    It needs read-write access this repository's{" "}
                    <Code>Contents</Code> and <Code>Pull requests</Code> scopes.
                  </>
                ) : (
                  <>
                    It needs access to the following scopes: <Code>api</Code>,{" "}
                    <Code>read_api</Code>, <Code>read_repository</Code> and{" "}
                    <Code>write_repository</Code>.
                  </>
                )}
              </>
            }
            name="access_token"
            {...form.getInputProps("access_token")}
            leftSection={<TbKey size={16} />}
            autoComplete="new-password"
            required
            disabled={!canEditAccessToken}
            rightSection={
              !canEditAccessToken ? (
                <TbX
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={() => form.setFieldValue("access_token", "")}
                />
              ) : undefined
            }
          />
          {tokenLink && (
            <Text size="xs" c="dimmed">
              You can create it, track it's usage and revoke it here:{" "}
              <Anchor
                href={tokenLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tokenLink}
              </Anchor>
              .
            </Text>
          )}
        </Stack>
        <TextInput
          label="Your Decap CMS login URL"
          placeholder="https://your-site.com/admin/index.html"
          description="Provide the full URL of your Decap CMS admin page. Users will be redirected there for CMS login."
          name="cms_url"
          {...form.getInputProps("cms_url")}
          required
        />
        <SimpleGrid cols={2}>
          <Stack>
            <Radio.Group
              mt="xl"
              label="Auth type"
              description="Choose your prefered login interface for this Decap CMS instance."
              {...form.getInputProps("auth_type")}
            >
              <Group pt="xs">
                <Radio label="Classic" value="classic" />
                <Radio label="PKCE" value="pkce" />
              </Group>
            </Radio.Group>
            {form.values.auth_type === "classic" ? (
              <Text size="sm">
                Users will be presented with a email/password form directly on
                your Decap CMS instance. Password logins only.
              </Text>
            ) : (
              <Stack gap="xs">
                <Text size="sm">
                  Users will see a Login button, which will initialize login
                  flow via DecapBridge for login options. Currently supported:
                </Text>
                <List size="sm">
                  <List.Item>Login with Google</List.Item>
                  <List.Item>Login with Microsoft</List.Item>
                  <List.Item>Password login</List.Item>
                </List>
                <Text size="xs">Requires Decap CMS v3.8.3 or above.</Text>
              </Stack>
            )}
            <Stack mt="auto">
              <Group justify="space-between">
                <Button {...form.submitButtonProps} accessKey="s">
                  {initialValues ? "Save changes" : "Create site"}
                </Button>
              </Group>
              {form.errors.action && <Group>{form.errors.action}</Group>}
            </Stack>
          </Stack>
          <Stack gap="xs" p="md">
            <Text ta="center" size="xs" c="dimmed">
              Preview of the {form.values.auth_type} flow:
            </Text>
            <Card p={0} radius="md">
              {form.values.auth_type === "classic" ? (
                <Image
                  radius={0}
                  src={`/login-screenshots/classic.png`}
                  alt={`classic login`}
                />
              ) : (
                <Carousel withIndicators>
                  <Carousel.Slide display="flex">
                    <Image
                      src={`/login-screenshots/pkce.png`}
                      alt={`pkce login`}
                      m="auto"
                      flex={1}
                    />
                  </Carousel.Slide>
                  <Carousel.Slide display="flex">
                    <Image
                      src={`/login-screenshots/pkce-2.png`}
                      alt={`pkce login step 2`}
                      m="auto"
                      flex={1}
                    />
                  </Carousel.Slide>
                </Carousel>
              )}
            </Card>
          </Stack>
        </SimpleGrid>
      </Stack>
    </FormWrapper>
  );
};

export default SiteForm;
