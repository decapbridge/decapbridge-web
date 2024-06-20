import { Box, Container, Title, Text, Stack } from "@mantine/core";

import utils from "/src/utils/utils.module.css";

interface HeadingSectionProps {
  title: string;
  description: string;
  topArea?: React.ReactNode;
}

const HeadingSection: React.FC<HeadingSectionProps> = ({
  title,
  description,
  topArea,
}) => {
  return (
    <Box
      mt={-1}
      className={`${utils["alt-background"]} ${utils["bottom-border"]} ${utils["top-border"]}`}
    >
      <Container size="md" px="lg" mb="xl" mt={topArea ? "0" : "xl"}>
        <Stack gap={4}>
          {topArea}
          <Title>{title}</Title>
          <Text>{description}</Text>
        </Stack>
      </Container>
    </Box >
  );
};

export default HeadingSection;
