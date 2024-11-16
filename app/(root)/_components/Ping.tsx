import React from "react";

const Ping = () => {
  return (
    <>
      <div className="relative flex items-center justify-center">
        <span className="absolute h-4 w-4 rounded-full bg-pink-800 opacity-75  animate-ping"></span>
        <span className="relative h-3 w-3 rounded-full z-10 bg-pink-800"></span>
      </div>
    </>
  );
};

export default Ping;
