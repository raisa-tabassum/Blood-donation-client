import React from "react";
import districts from "../assets/json/districts.json";
import upazilas from "../assets/json/upazilas.json";

const useLocationData = () => {
  return { districts, upazilas };
};

export default useLocationData;
