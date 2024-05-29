import { useContext } from "react";
import { contextData } from "./context/logic";
import LeftMenu from "./components/left-menu/LeftMenu";
import AppRouter from "./AppRouter";

function Rout() {
  const { userLoggedIn } = useContext(contextData);

  return (
    <div className="w-full flex">
      {userLoggedIn && <LeftMenu />}
      <div className="w-full h-full bg-[#1b1b1b]">
        <AppRouter />
      </div>
    </div>
  );
}

export default Rout;
