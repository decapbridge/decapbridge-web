import React from "react";
import { TbSearch } from "react-icons/tb";
import { MantineStyleProps, ActionIcon, Tooltip } from "@mantine/core";
import { spotlight } from "@mantine/spotlight";

interface SearchInputProps
  extends MantineStyleProps, React.ComponentPropsWithoutRef<"button"> {}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <Tooltip label="Search" withArrow>
      <ActionIcon
        onClick={spotlight.open}
        variant="transparent"
        size="lg"
        {...props}
      >
        <TbSearch size="1.25rem" />
      </ActionIcon>
    </Tooltip>
  );
};

export default SearchInput;
