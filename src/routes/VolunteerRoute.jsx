import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/Loading/Loading";
import Forbidden from "../components/shared/Forbidden/Forbidden";

const VolunteerRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role } = useRole();

  if (loading) {
    return <Loading></Loading>;
  }
  if (role !== "volunteer") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default VolunteerRoute;
