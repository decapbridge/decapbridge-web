import useMaybeUser from "/src/hooks/useMaybeUser";

const useCurrentUser = () => {
  const { user } = useMaybeUser();

  if (!user) {
    throw new Error("User not in context.");
  }

  return user;
};

export default useCurrentUser;
