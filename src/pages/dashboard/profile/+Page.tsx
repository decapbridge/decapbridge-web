import {
  Button,
  TextInput,
  Text,
  Stack,
  Group,
} from "@mantine/core";
import { updateUser } from "@directus/sdk";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useData } from "vike-react/useData";
import { z } from "zod";

import TimeAgo from "/src/components/ui/TimeAgo";
import useCurrentUser from "/src/hooks/useCurrentUser";
import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import directus from "/src/utils/directus";
import onlyDiff from "/src/utils/onlyDiff";
import type { Data } from "./+data";

const schema = z.object({
  first_name: z.string().min(3).max(255),
  last_name: z.string().min(3).max(255),
});

const MyProfilePage: React.FC = () => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  const content = useData<Data>();

  const form = useAsyncForm({
    allowMultipleSubmissions: true,
    schema,
    initialValues: {
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
    },
    action: async (values) => {
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
  return (
    <Stack>
      {user.date_created && (
        <Text>
          Created : <TimeAgo span fw="bold" timestamp={user.date_created} />
        </Text>
      )}
      {user.last_access && (
        <Text>
          Last access: <TimeAgo span fw="bold" timestamp={user.last_access} />
        </Text>
      )}
      <Text>
        {user.first_name} {user.last_name}
      </Text>
      <FormWrapper
        form={form}
        withBorder
        shadow="md"
        p="lg"
        my="xs"
        radius="md"
      >
        <Stack gap="xs">
          <TextInput
            name="first_name"
            label={content.first_name.label}
            placeholder={content.first_name.placeholder}
            {...form.getInputProps("first_name")}
          />
          <TextInput
            name="last_name"
            label={content.last_name.label}
            placeholder={content.last_name.placeholder}
            {...form.getInputProps("last_name")}
          />
          <Group>
            <Button
              {...form.submitButtonProps}
              disabled={!form.isDirty() || form.submitButtonProps.disabled}
              mt="sm"
              accessKey="s"
            >
              {content.save}
            </Button>
          </Group>
        </Stack>
      </FormWrapper>
    </Stack>
  );
};

export default MyProfilePage;
