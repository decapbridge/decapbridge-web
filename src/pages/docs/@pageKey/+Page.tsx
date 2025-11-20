import { Container, Group } from "@mantine/core";
import { useData } from "vike-react/useData";
import Markdown from "/src/components/ui/Markdown";
import { TableOfContents } from "/src/components/ui/TableOfContents";
import mdToToc from "/src/utils/mdToToc";
import { Data } from "./+data";

import styles from "/src/utils/utils.module.css";

const DocsPage: React.FC = () => {
  const { body } = useData<Data>();
  const toc = mdToToc(body);
  return (
    <>
      <Container size="lg" p="xl" my="xl">
        <Group
          wrap="nowrap"
          align="flex-start"
          justify="space-between"
          className={styles["oversized-toc-wrapper"]}
        >
          <Markdown markdown={body} />
          <TableOfContents toc={toc} />
        </Group>
      </Container>
    </>
  );
};

export default DocsPage;
