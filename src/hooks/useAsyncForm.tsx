/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import {
  ButtonProps,
  LoadingOverlay,
  Paper,
  PaperProps,
  Text,
  List,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { ZodObject } from "zod";

interface FormWrapperProps extends PaperProps {
  children: React.ReactNode;
  form: ReturnType<typeof useAsyncForm<any>>;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  form,
  ...props
}) => {
  return (
    <Paper
      pos="relative"
      style={{ overflow: "hidden" }}
      component="form"
      method="post"
      onSubmit={form.onSubmit}
      aria-busy={form.state === "submitting"}
      {...props}
    >
      {children}
      <LoadingOverlay
        visible={form.loadingOverlay && form.state === "submitting"}
        overlayProps={{ blur: 2 }}
      />
    </Paper>
  );
};

type UseAsyncFormParams<V extends Record<string, any>> = Parameters<
  typeof useForm<V>
>[0] & {
  schema: ZodObject<any>;
  action: (v: V) => void;
  loadingOverlay?: boolean;
  allowMultipleSubmissions?: boolean;
};

type FormState = "iddle" | "submitting" | "submitted";

const useAsyncForm = <V extends Record<string, unknown>>({
  schema,
  action,
  allowMultipleSubmissions,
  loadingOverlay,
  ...args
}: UseAsyncFormParams<V>) => {
  const form = useForm({
    ...args,
    validate: zodResolver(schema),
  });

  const [state, setState] = useState<FormState>("iddle");

  const onSubmit = form.onSubmit(async (values) => {
    try {
      setState("submitting");
      await action(values);
      if (allowMultipleSubmissions) {
        setState("iddle");
        form.resetTouched();
        form.resetDirty();
      } else {
        setState("submitted");
        form.reset();
      }
    } catch (error) {
      const formErrors = applyErrorsToForm(error, form);
      for (const formErr of formErrors) {
        notifications.show({
          color: "red",
          message: formErr,
        });
      }
      setState("iddle");
      form.resetTouched();
      form.resetDirty();
    }
  });

  const disabled =
    (allowMultipleSubmissions && !form.isDirty()) ||
    !form.isValid() ||
    state !== "iddle";

  const submitButtonProps: ButtonProps & { type: "submit" } = {
    type: "submit",
    disabled,
    loading: !loadingOverlay && state === "submitting",
  };

  return { ...form, state, onSubmit, submitButtonProps, loadingOverlay };
};

import { UseFormReturnType } from "@mantine/form";

const errorMap = {
  [`Value for field "email" in collection "directus_users" has to be unique.`]:
    "This email is already used.",
};

const formatErrorMessages = (errorMessage: string) => {
  for (const [regex, humanMessage] of Object.entries(errorMap)) {
    if (new RegExp(regex).test(errorMessage)) {
      return humanMessage;
    }
  }

  return errorMessage;
};

const applyErrorsToForm = (error: any, form: UseFormReturnType<any>) => {
  const actionErrors: string[] = [];

  if (error.message) {
    actionErrors.push(error.message);
  }

  if (error.errors && Array.isArray(error.errors)) {
    for (const err of error.errors) {
      const errorMessage = formatErrorMessages(err.message);
      const key = Object.keys(form.values).find((field) =>
        err.message?.includes(`"${field}"`)
      );
      if (key) {
        form.setFieldError(key, errorMessage);
      } else {
        actionErrors.push(errorMessage);
      }
    }
  }

  if (actionErrors.length >= 1) {
    form.setErrors({
      action:
        actionErrors.length === 1 ? (
          <Text c="var(--mantine-color-error)" size="sm">
            {actionErrors[0]}
          </Text>
        ) : (
          <List c="var(--mantine-color-error)" size="sm">
            {actionErrors.map((err) => (
              <List.Item key={err}>
                {err}
              </List.Item>
            ))}
          </List>
        ),
    });
  }

  return actionErrors;
};

export default useAsyncForm;
