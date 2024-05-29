import { contextData } from "../../context/logic";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MyButton from "../UI/my-buttons/MyButton";
import Message from "./Message";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

function Chat() {
  const { userLoggedIn, userInfo } = useContext(contextData);
  const navigate = useNavigate();
  const { roomTitle } = useParams();
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
    if (!fetched) {
      getChatMessages();
      setChatMessages([]);
    }
  }, []);

  const getChatMessages = async () => {
    const querySnapshot = await getDocs(
      collection(db, "rooms", `${roomTitle}`, `${roomTitle} messages`)
    );
    querySnapshot.forEach((doc) => {
      setChatMessages((prev) => [doc.data(), ...prev]);
      setFetched(true);
    });
  };

  const setChatInfo = async () => {
    await addDoc(
      collection(db, "rooms", `${roomTitle}`, `${roomTitle} messages`),
      {
        user: userInfo.email,
        text: input,
        time: serverTimestamp(),
      }
    );
  };

  return (
    <div className="w-full h-full">
      <div className="fixed top-0 w-full h-[60px] flex bg-[#222222] justify-start items-center">
        <h1 className="ps-5 text-white text-xl">{roomTitle}</h1>
      </div>
      <div className="w-full flex flex-col gap-2 max-h-[800px] mt-[70px] overflow-y-scroll">
        {chatMessages.length ? (
          chatMessages.map((item: any) => <Message item={item} />)
        ) : (
          <p className="py-2 text-center text-white">Loading...</p>
        )}
      </div>
      <div className="fixed bottom-0 w-full h-[80px] flex bg-[#222222] justify-start items-center">
        <div className="flex gap-3">
          <input
            className="ms-2 w-[500px] h-[50px] text-white rounded-lg ps-3 bg-[#2b2b2b]"
            type="text"
            placeholder="Write here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span
            className="flex"
            onClick={() => {
              setChatInfo();
              setInput("");
              setChatMessages([]);
              getChatMessages();
            }}
          >
            <MyButton className="px-[30px] bg-[#2c4494]">Send</MyButton>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chat;
