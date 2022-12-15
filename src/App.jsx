import "./App.css";

import { useEffect, useState } from "react";

import Prompt from "./compontents/Prompt";
import { commands } from "./data/commands";

// Captures every keystroke and returns it as a string
function captureKeystroke(e) {
  const input = e.target.value;
  return input;
}

// Main function
const App = () => {
  const [input, setInput] = useState(() => "");
  const [prevInput, setPrevInput] = useState([]);

  // Resets the console to the initial state
  function clearConsole() {
    setInput("");
    setPrevInput([]);
  }

  // If input is a available command, return it as a string
  function evaluateInput() {
    const _commands = commands;
    const _input = input.toLocaleLowerCase().trim();
    return _commands.includes(_input) ? _input : "";
  }

  // Handles what happens after enter key has been pressed
  function handleEnterKey(e) {
    if (e.key !== "Enter") return; // Ignore if key isn't enter and return

    // If the users input isn't empty, then save it as a previous input
    // trim() is to remove newline character from input
    input.trim() !== "" ? setPrevInput((prev) => [...prev, input.trim()]) : null;

    // TODO: Handle more inputs than just clear
    if (evaluateInput() === "clear") {
      clearConsole();
    }

    // Clear the input area
    const textArea = document.querySelector("textarea");
    textArea.value = "";

    // Reset the input
    setInput("");
  }

  // Adds eventhandler to capture when enter key is pressed
  useEffect(() => {
    document.addEventListener("keydown", handleEnterKey);
    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [handleEnterKey]);
  return (
    <div className="mx-4">
      <textarea
        onChange={(e) => {
          setInput((prev) => (prev = captureKeystroke(e)));
        }}
        autoFocus={true}
        onBlur={({ target }) => target.focus()}
      />
      <div className="lineContainer">
        {prevInput.map((_input, index) => {
          return <Prompt input={_input} key={index} />;
        })}
        <Prompt input={input} />
      </div>
    </div>
  );
};

export default App;
