import { ActionIconProps, useMantineColorScheme } from "@mantine/core";

const HljsCssLoader: React.FC<ActionIconProps> = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      {colorScheme === "light" ? (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
        />
      ) : (
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        />
      )}

      <style>{`.hljs { background: var(--ch-background); }`}</style>
    </>
  );
};

export default HljsCssLoader;
