type MessageProps = {
  item: any;
};

function Message({ item }: MessageProps) {
  return (
    <span className="flex">
      <p className="mx-3 py-1 px-4 rounded-lg bg-[#fff]">{item.user}: {item.text}</p>
    </span>
  );
}

export default Message;
