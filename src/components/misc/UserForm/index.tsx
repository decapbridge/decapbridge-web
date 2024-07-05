import {
  TextInput,
  Stack,
  Group,
  SimpleGrid,
  ButtonProps,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { z } from "zod";

import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";

import { CustomSchema } from "/src/utils/directus";

import PasswordStrength from "/src/pages/auth/signup/PasswordStrength";

const schema = z.object({
  // avatar: z.string().url().or(z.any()).nullable(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email().max(255),
  password: z.string().min(8).max(255).optional(),
});

interface UserFormProps {
  type: "signup" | "update" | "invite" | "finalize";
  initialValues?: Partial<CustomSchema["directus_users"][number]>;
  action: (values: z.infer<typeof schema>) => Promise<void>;
  renderButton: (btnProps: ButtonProps) => React.ReactNode;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  type,
  action,
  renderButton,
}) => {
  // const resetRef = useRef<() => void>(null);
  // const maybeUploadAvatar = async () => {
  //   if (values.avatar instanceof File) {
  //     const form = new FormData();
  //     form.append("file", values.avatar);
  //     const avatarFile = await directus.request(uploadFiles(form));
  //     values.avatar = avatarFile.id;
  //   }
  // };

  const form = useAsyncForm({
    allowMultipleSubmissions: type === "update",
    schema,
    initialValues: {
      // avatar: (initialValues?.avatar ?? null) as any,
      first_name: initialValues?.first_name ?? "",
      last_name: initialValues?.last_name ?? "",
      email: initialValues?.email ?? "",
      password: initialValues?.password ?? undefined,
    },
    action: async (values) => {
      await action(values);
      if (type === "invite") {
        form.reset();
      }
    },
  });

  // const avatarProps = form.getInputProps("avatar");
  const passwordProps = form.getInputProps("password");

  // const avatarUrl = useMemo(() => {
  //   if (form.values.avatar instanceof File) {
  //     return URL.createObjectURL(form.values.avatar);
  //   }
  //   if (form.values.avatar) {
  //     return getAvatarUrl(form.values.avatar);
  //   }
  // }, [form.values.avatar]);

  // const clearFile = () => {
  //   avatarProps.onChange(null);
  //   resetRef.current?.();
  // };

  return (
    <FormWrapper form={form} radius={0} shadow="none">
      <Stack>
        {/* <Stack align="center" gap="xs">
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
                  variant="light"
                  size="xs"
                  {...props}
                  rightSection={
                    avatarProps.value ? (
                      <IconEdit stroke={1.5} size="1.5em" />
                    ) : (
                      <IconUpload stroke={1.5} size="1.5em" />
                    )
                  }
                >
                  {avatarProps.value ? "Change" : "Upload profile picture"}
                </Button>
              )}
            </FileButton>
            {avatarProps.value && (
              <Button
                variant="light"
                size="xs"
                color="red"
                onClick={clearFile}
                rightSection={<IconX stroke={1.5} size="1.5em" />}
              >
                Remove
              </Button>
            )}
          </Group>
        </Stack> */}
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
          leftSection={<IconAt size={16} />}
          required
          {...form.getInputProps("email")}
          disabled={type === "update" || type === "finalize"}
        />
        {(type === "signup" || type === "finalize") && (
          <PasswordStrength
            name="password"
            label="Password"
            placeholder="Your password"
            leftSection={<IconLock size={16} />}
            required
            {...passwordProps}
            value={passwordProps.value ?? ""}
            autoComplete="new-password"
            autoFocus={Boolean(form.values.first_name)}
          />
        )}
        {form.errors.action && (
          <Group justify="center">{form.errors.action}</Group>
        )}
        <Group>{renderButton(form.submitButtonProps)}</Group>
      </Stack>
    </FormWrapper>
  );
};

export default UserForm;
