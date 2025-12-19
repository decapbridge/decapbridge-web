import {
  Text,
  Container,
  Stack,
  Paper,
  Title,
  Divider,
  Button,
  Group,
  Avatar,
  FileButton,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import TimeAgo from "/src/components/ui/TimeAgo";
import useCurrentUser from "/src/hooks/useCurrentUser";
import { updateUser, uploadFiles } from "@directus/sdk";
import { notifications } from "@mantine/notifications";
import directus from "/src/utils/directus";
import onlyDiff from "/src/utils/onlyDiff";
import queryClient from "/src/utils/queryClient";
import { TbAt, TbEdit, TbPassword, TbUpload, TbX } from "react-icons/tb";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import { useRef, useMemo } from "react";
import getAvatarUrl from "/src/utils/getAvatarUrl";
import z from "zod";
import { GoogleIcon } from "/src/components/ui/GoogleIcon";
import { MicrosoftIcon } from "/src/components/ui/MicrosoftIcon";

const schema = z.object({
  avatar: z.url().or(z.any()).nullable(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.email().max(255),
});

const MyProfilePage: React.FC = () => {
  const user = useCurrentUser();

  const resetRef = useRef<() => void>(null);

  const form = useAsyncForm({
    allowMultipleSubmissions: true,
    schema,
    initialValues: {
      avatar: (user?.avatar ?? null) as any,
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      password: user?.password ?? undefined,
    },
    action: async (values) => {
      if (values.avatar instanceof File) {
        const form = new FormData();
        form.append("file", values.avatar);
        const avatarFile = await directus.request(uploadFiles(form));
        values.avatar = avatarFile.id;
      }

      await directus.request(updateUser(user.id, onlyDiff(user, values)));
      await queryClient.invalidateQueries({
        queryKey: ["user"],
        refetchType: "all",
      });
      notifications.show({
        color: "green",
        message: "Changes saved.",
      });
    },
  });

  const avatarProps = form.getInputProps("avatar");

  const avatarUrl = useMemo(() => {
    if (typeof window !== "undefined" && form.values.avatar instanceof File) {
      return URL.createObjectURL(form.values.avatar);
    }
    if (form.values.avatar) {
      return getAvatarUrl(form.values.avatar);
    }
  }, [form.values.avatar]);

  const clearFile = () => {
    avatarProps.onChange(null);
    resetRef.current?.();
  };

  return (
    <Container size="xs" my="xl">
      <Stack gap="xl">
        <Paper withBorder shadow="md" p="xl" radius="lg">
          <Title order={3}>Edit profile</Title>
          <Divider my="sm" />

          <FormWrapper form={form} radius={0} shadow="none">
            <Stack>
              <Stack align="center" gap="xs" py="sm">
                <Avatar
                  size="xl"
                  src={avatarUrl}
                  name={`${form.values.first_name} ${form.values.last_name}`}
                  color={form.values.first_name ? "initials" : undefined}
                />
                <Group gap="xs">
                  <FileButton
                    resetRef={resetRef}
                    onChange={avatarProps.onChange}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <Button
                        variant={avatarProps.value ? "light" : "subtle"}
                        size="xs"
                        {...props}
                        rightSection={
                          avatarProps.value ? (
                            <TbEdit size="1.5em" />
                          ) : (
                            <TbUpload size="1.5em" />
                          )
                        }
                      >
                        {avatarProps.value ? "Change" : "Upload picture"}
                      </Button>
                    )}
                  </FileButton>
                  {avatarProps.value && (
                    <Button
                      variant="light"
                      size="xs"
                      color="red"
                      onClick={clearFile}
                      rightSection={<TbX size="1.5em" />}
                    >
                      Remove
                    </Button>
                  )}
                </Group>
              </Stack>
              <SimpleGrid spacing="md" cols={{ base: 1, sm: 2 }}>
                <TextInput
                  name="first_name"
                  label="First name"
                  placeholder="My first name"
                  {...form.getInputProps("first_name")}
                  autoFocus={!form.values.first_name}
                />
                <TextInput
                  name="last_name"
                  label="Last name"
                  placeholder="My last name"
                  {...form.getInputProps("last_name")}
                />
              </SimpleGrid>
              <TextInput
                name="email"
                label="Email"
                placeholder="email@example.com"
                leftSection={<TbAt size={16} />}
                required
                {...form.getInputProps("email")}
                disabled
              />
              {form.errors.action && (
                <Group justify="center">{form.errors.action}</Group>
              )}
              <Group>
                <Button {...form.submitButtonProps} accessKey="s" mt="xs">
                  Save changes
                </Button>
              </Group>
            </Stack>
          </FormWrapper>
        </Paper>
        <Stack>
          {user.last_access && (
            <Text>
              Last access:{" "}
              <TimeAgo span fw="bold" timestamp={user.last_access} />
            </Text>
          )}
          <Group gap="sm">
            <Text>Login method:</Text>
            {user.provider === "google" ? (
              <Group gap={8}>
                <GoogleIcon />
                <Text fw="bold">Google login</Text>
              </Group>
            ) : user.provider === "microsoft" ? (
              <Group gap={8}>
                <MicrosoftIcon />
                <Text fw="bold">Microsoft login</Text>
              </Group>
            ) : (
              <Group gap={8}>
                <TbPassword size="1.5rem" />
                <Text fw="bold">Password login</Text>
              </Group>
            )}
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
};

export default MyProfilePage;
