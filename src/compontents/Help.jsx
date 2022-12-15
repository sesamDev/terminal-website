import React from "react";
import { commands } from "../data/commands";

const Help = () => {
  return (
    <>
      {commands.map((command) => (
        <p key={command}>{command}</p>
      ))}
    </>
  );
};

export default Help;
