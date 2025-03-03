import React from "react";
import { TbSearch } from "react-icons/tb";
import { MantineStyleProps, ActionIcon } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";

interface SearchInputProps
  extends MantineStyleProps,
    React.ComponentPropsWithoutRef<"button"> {}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <ActionIcon
      onClick={spotlight.open}
      variant="transparent"
      size="md"
      {...props}
    >
      <TbSearch size="1.25rem" />
    </ActionIcon>
  );
};

export default SearchInput;
