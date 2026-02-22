import { Box, Container, Title, Text, Breadcrumbs } from "@mantine/core";

import utils from "/src/utils/utils.module.css";

interface HeadingSectionProps {
  title: string;
  description: string;
}

const HeadingSection: React.FC<HeadingSectionProps> = ({
  title,
  description,
}) => {
  return (
    <Box
      mt={-1}
      className={`${utils["alt-background"]} ${utils["bottom-border"]} ${utils["top-border"]}`}
    >
      <Container size="xl" px="xl" py="lg">
        <Breadcrumbs separator="/">
          <Title order={6} lh="1.625rem">
            {title}
          </Title>
          {description && <Text size="sm">{description}</Text>}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};

export default HeadingSection;
