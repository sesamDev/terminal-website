import React from "react";

const Prompt = (props) => {
  const user = "guest@terminal:~$";
  return (
    <>
      <p className="promptLine">{`${user} ${props.input}`}</p>
    </>
  );
};

export default Prompt;
