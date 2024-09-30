import Channel from "@components/channel";

const ChatPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useCurrentUser();

  return <>{currentUser && <Channel id={id} />}</>;
};

export default ChatPage;