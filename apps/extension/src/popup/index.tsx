import React, { useEffect, useState } from "react";
import icon from "data-base64:./icon.png";

import "./style.css";

const IndexPopup = () => {
  const [totalReactionCount, setTotalReactionCount] = useState<number | null>(
    null,
  );
  useEffect(() => {
  }, []);

  return (
    <div className="App font['Roboto', sans-serif] flex min-w-[250px] select-none flex-col gap-2 bg-slate-900 p-1 text-center font-light text-white">
      <a href="https://linkedout.lol/" target="_blank">
        <img src={icon} alt="icon" className="m-4 mx-auto size-20" />
      </a>

      <h1 className="text-2xl">LinkedOut</h1>
      <p className="text-[1.2em]">Anonymous dislikes for LinkedIn</p>
      {totalReactionCount && (
        <>
          <hr />
          <p className="text-[1.2em]">Total LinkedOut reactions given:</p>
          <div className="text-3xl">{totalReactionCount}</div>
        </>
      )}
      <hr />
      <a href="https://j4a.uk/" target="_blank" className="m-1 underline">
        By J4A Industries
      </a>
    </div>
  );
};

export default IndexPopup;
