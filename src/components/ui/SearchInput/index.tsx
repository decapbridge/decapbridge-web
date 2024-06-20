import React from "react";
import { IconSearch } from "@tabler/icons-react";
import { MantineStyleProps, ActionIcon } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";

interface SearchInputProps
  extends MantineStyleProps,
  React.ComponentPropsWithoutRef<"button"> { }

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <ActionIcon
      onClick={spotlight.open}
      variant="transparent"
      size="md"
      {...props}
    >
      <IconSearch size="1.25rem" stroke={1.5} />
    </ActionIcon>
  );
};

export default SearchInput;
