import { ReactNode } from "react";
import { customEndpoint } from "@directus/sdk";
import {
  Stack,
  Group,
  Button,
  Text,
  Modal,
  Code,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TbArrowsExchange } from "react-icons/tb";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

import useAsyncForm, { FormWrapper } from "/src/hooks/useAsyncForm";
import directus, { Site } from "/src/utils/directus";
import navigate from "/src/utils/navigate";

interface TransferOwnershipModalProps {
  site: Site;
  children: (open: () => void) => ReactNode;
}

const schema = z.object({
  email: z.email().max(255),
});

const TransferOwnershipModal: React.FC<TransferOwnershipModalProps> = ({
  site,
  children,
}) => {
  const [opened, { open, close }] = useDisclosure();
  const queryClient = useQueryClient();

  const form = useAsyncForm({
    schema,
    initialValues: { email: "" },
    action: async (values) => {
      try {
        await directus.request(
          customEndpoint<{ success: boolean; new_owner_id: string }>({
            method: "POST",
            path: `/sites/${site.id}/transfer-ownership`,
            body: JSON.stringify(values),
          }),
        );
      } catch (error: any) {
        const message =
          error?.errors?.error_description ??
          error?.errors?.[0]?.message ??
          error?.message ??
          "Failed to transfer ownership";
        form.setFieldError("email", message);
        throw { errors: [] };
      }
      notifications.show({
        color: "green",
        message: "Ownership transferred.",
      });
      close();
      await navigate("/dashboard/sites");
      await queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });

  return (
    <>
      {children(open)}
      <Modal title="Transfer ownership?" opened={opened} onClose={close}>
        <FormWrapper form={form} radius={0}>
          <Stack gap="xs">
            <Text>
              You&apos;re about to transfer ownership of{" "}
              <Code>{site.repo}</Code>. You will become a collaborator on this
              site. The new owner will be responsible for site settings, and
              their account&apos;s plan will be the one applied to this site
              from now on.
            </Text>
            <TextInput
              label="New owner email"
              description="Must be an existing collaborator on this site."
              placeholder="bob@example.com"
              {...form.getInputProps("email")}
              required
            />
            <Group justify="flex-end" mt="sm">
              <Button onClick={close} variant="default" size="xs">
                Cancel
              </Button>
              <Button
                {...form.submitButtonProps}
                color="red"
                size="xs"
                rightSection={
                  <TbArrowsExchange
                    size="1rem"
                    style={{ margin: "0 -0.125rem 0 -0.25rem" }}
                  />
                }
              >
                Transfer ownership
              </Button>
            </Group>
          </Stack>
        </FormWrapper>
      </Modal>
    </>
  );
};

export default TransferOwnershipModal;
