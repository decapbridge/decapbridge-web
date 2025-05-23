import { Transition, TransitionProps } from "@mantine/core";
import { useMounted } from "@mantine/hooks";

type MountTransitionProps = Omit<TransitionProps, "mounted">;

const MountTransition: React.FC<MountTransitionProps> = ({
  children,
  ...props
}) => {
  const isMounted = useMounted();
  return (
    <Transition {...props} mounted={isMounted}>
      {children}
    </Transition>
  );
};

export default MountTransition;
