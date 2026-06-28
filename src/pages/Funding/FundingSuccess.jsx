import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FundingSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/funding-success?session_id=${sessionId}`).then(() => {
        navigate("/dashboard/funding");
      });
    }
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="flex justify-center py-20">
      <span className="loading loading-spinner text-primary loading-lg"></span>
    </div>
  );
};

export default FundingSuccess;
