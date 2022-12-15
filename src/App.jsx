import "./App.css";

import { useEffect, useState } from "react";

import About from "./compontents/About";
import Error from "./compontents/Error";
import Help from "./compontents/Help";
import Prompt from "./compontents/Prompt";
import Weather from "./compontents/Weather";
import { commands } from "./data/commands";
import uniqid from "uniqid";

// Captures every keystroke and returns it as a string
function captureKeystroke(e) {
  const input = e.target.value;
  return input;
}

// Main function
const App = () => {
  const [input, setInput] = useState(() => "");
  const [prevInput, setPrevInput] = useState([]);
  const [tree, setTree] = useState([]);

  function executeInput(command) {
    const date = new Date();
    switch (command.toLowerCase()) {
      case "clear":
        return clearConsole();
      case "about":
        return setTree((prev) => [...prev, <Prompt input={command} key={uniqid()} />, <About key={uniqid()} />]);
      case "weather":
        return setTree((prev) => [...prev, <Prompt input={command} key={uniqid()} />, <Weather key={uniqid()} />]);
      case "":
        return setTree((prev) => [...prev, <Prompt input={""} key={uniqid()} />]);
      case "help":
        return setTree((prev) => [...prev, <Prompt input={command} key={uniqid()} />, <Help key={uniqid()} />]);
      default: // If command is not found
        return setTree((prev) => [
          ...prev,
          <Prompt input={command} key={uniqid()} />,
          <Error command={command} key={uniqid()} />,
        ]);
    }
  }

  // Resets the console to the initial state
  function clearConsole() {
    setInput("");
    setTree([]);
  }

  // Handles what happens after enter key has been pressed
  function handleEnterKey(e) {
    if (e.key !== "Enter") return; // Ignore if key isn't enter and return

    // Remove newline character
    const userInput = input.trim();

    // If the users input isn't empty, then save it as a previous input
    userInput !== "" ? setPrevInput((prev) => [...prev, input.trim()]) : null;

    // Executes input
    executeInput(userInput);

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
        className="absolute -left-80"
      />
      <div className="lineContainer">
        {tree.map((component) => component)}
        <Prompt input={input} />
      </div>
    </div>
  );
};

export default App;
