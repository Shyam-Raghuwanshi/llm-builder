import React from "react";

const AppTitle = () => {
  return (
    <div id="title" className="relative flex flex-col items-center">
      <div className="flex flex-row items-start">
        <span
          className="text-4xl font-bold text-slate-12 xs:text-5xl sm:text-7xl dark:text-slate-4"
          style={{
            textShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          LLM-Builder
        </span>
      </div>
    </div>
  );
};

export default AppTitle;
