import { Text, TextProps, Tooltip } from '@mantine/core';
import { formatDistanceToNow, formatISO9075 } from 'date-fns';

interface TimeAgoProps extends TextProps {
  timestamp: string | undefined;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ timestamp, ...props }) => {
  if (!timestamp) {
    return (
      <Text size="xs" c="dimmed">
        --
      </Text>
    );
  }

  const timeago = formatDistanceToNow(new Date(timestamp));
  const humanTime = formatISO9075(new Date(timestamp));

  return (
    <Tooltip label={humanTime}>
      <Text {...props}>{timeago} ago</Text>
    </Tooltip>
  );
};

export default TimeAgo;
