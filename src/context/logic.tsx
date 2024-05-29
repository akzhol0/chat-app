import React, { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

type ContextOverAllProps = {
  children: React.ReactNode;
};

type ContextProps = {
  userLoggedIn: boolean;
  userInfo: any;
  rooms: any,
  setUserLoggedIn: (arg0: boolean) => void;
  getUserInfo: () => void;
};

export const contextData = createContext({} as ContextProps);

export function ContextOverAll({ children }: ContextOverAllProps) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<any>([]);

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!fetched) {
      getUserInfo();
    }
  }, []);

  const getUserInfo = () => {
    const userStringifyed = localStorage.getItem("user");
    const user = userStringifyed ? JSON.parse(userStringifyed) : null;

    if (user !== null) {
      setUserLoggedIn(true);
      setFetched(true);
      setUserInfo(user);
      getRooms();
    } else {
      setUserLoggedIn(false);
    }
  };

  const getRooms = async () => {
    const roomsRef = collection(db, "rooms");
    const querySnapshot = await getDocs(roomsRef);

    querySnapshot.forEach((doc) => {
      setRooms(prev => [...prev, doc]);
    });
  };

  return (
    <contextData.Provider
      value={{
        userLoggedIn,
        setUserLoggedIn,
        userInfo,
        getUserInfo,
        rooms,
      }}
    >
      {children}
    </contextData.Provider>
  );
}
