import { useContext } from "react";
import { contextData } from "../../context/logic";
import MyButton from "../UI/my-buttons/MyButton";
import Room from "./Room";

function LeftMenu() {
  const { userInfo, setUserLoggedIn, rooms } = useContext(contextData);

  return (
    <div className="min-w-[350px] h-screen overflow-y-scroll">
      <div className="w-full h-full flex flex-col bg-[#131313]">
        <div className="h-[40px] flex justify-center bg-[#1b1b1b] text-white">
          <span className="flex gap-2 justify-center items-center">
            <p className="text-[#cacaca]">User email:</p>
            <p>{userInfo.email}</p>
            <span
              onClick={() => {
                setUserLoggedIn(false);
                localStorage.removeItem("user");
              }}
            >
              <MyButton className="py-1">Exit</MyButton>
            </span>
          </span>
        </div>
        <div className="w-full h-full flex flex-col">
        {rooms.length ? (
          rooms.map((item: any) => (
            <Room key={item.id} item={item}/>
          ))
        ) : (
          <p className="py-2 text-center text-white">Loading...</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
