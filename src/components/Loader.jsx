import React from "react";
import { infinity } from "ldrs";

infinity.register();

export const Loader = () => {
  return (
    // Default values shown
    <div className="container-loader">
      <l-infinity
        size="55"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="0.6"
        color="black"
      ></l-infinity>
    </div>
  );
};
