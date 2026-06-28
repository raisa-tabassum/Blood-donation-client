import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Forbidden from "../components/shared/Forbidden/Forbidden";

const VolunteerRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role } = useRole();

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-primary text-primary loading-lg"></span>
      </div>
    );
  }
  if (role !== "volunteer") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default VolunteerRoute;
