import { Text } from "@mantine/core";
import { useOs } from "@mantine/hooks";

import styles from "./tag.module.css";

interface ShortcutTagProps {
  comboKey: string;
}

function ShortcutTag({ comboKey }: ShortcutTagProps) {
  const os = useOs();

  return (
    <Text fw={700} className={styles.shortcut} ml="auto">
      {os === "undetermined" || os === "macos" ? "⌘" : "Ctrl"} + {comboKey}
    </Text>
  );
}

export default ShortcutTag;
