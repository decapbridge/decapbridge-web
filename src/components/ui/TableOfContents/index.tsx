import { useEffect, useState } from "react";
import { IconListSearch } from "@tabler/icons-react";
import { Box, Group, rem, ScrollArea, Text } from "@mantine/core";
import { TocItem } from "/src/utils/mdToToc";

import classes from "./toc.module.css";

interface TableOfContentsProps {
  toc: TocItem[];
}

function getActiveElement(rects: DOMRect[]) {
  if (rects.length === 0) {
    return -1;
  }

  const closest = rects.reduce(
    (acc, item, index) => {
      if (Math.abs(acc.position) < Math.abs(item.y)) {
        return acc;
      }

      return {
        index,
        position: item.y,
      };
    },
    { index: 0, position: rects[0].y }
  );

  return closest.index;
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const mdContainer = document.getElementById("markdown-content");
    if (mdContainer) {
      const headings = Array.from(mdContainer.querySelectorAll("[data-order]"));
      setActive(
        getActiveElement(headings.map((d) => d.getBoundingClientRect()))
      );
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (toc.length === 0) {
    return null;
  }

  const items = toc.map((heading, index) => (
    <Text<"a">
      key={heading.id}
      component="a"
      href={`#${heading.id}`}
      className={classes.link}
      mod={{ active: active === index }}
      __vars={{ "--toc-link-offset": `${heading.level - 1}` }}
    >
      {heading.content}
    </Text>
  ));

  return (
    <Box component="nav" className={classes.wrapper}>
      <Group mb="md">
        <IconListSearch
          style={{ width: rem(20), height: rem(20) }}
          stroke={1.5}
        />
        <Text>Table of contents</Text>
      </Group>
      <ScrollArea.Autosize
        mah={`calc(100vh - ${rem(140)})`}
        type="never"
        offsetScrollbars
      >
        {items}
      </ScrollArea.Autosize>
    </Box>
  );
}
