import { useContext, useEffect } from "react";
import { contextData } from "../../context/logic";
import { useNavigate } from "react-router";

function MainPage() {
  const navigate = useNavigate();
  const { userLoggedIn } = useContext(contextData);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
  });

  return (
    <div className="w-full h-screen flex"></div>
  );
}

export default MainPage;
