import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts/AuthContexts";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  return authInfo;
};

export default useAuth;