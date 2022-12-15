import "./App.css";

import { useEffect, useState } from "react";

import { commands } from "./data/commands";

function captureKeystroke(e) {
  const input = e.target.value;
  return input;
}

function Prompt(props) {
  const user = "guest@terminal:~$";

  return (
    <>
      <p className="promptLine">{`${user} ${props.input}`}</p>
    </>
  );
}

function App() {
  const [input, setInput] = useState(() => "");
  console.log(input === "");
  const [numberOfLines, setNumberOfLines] = useState(() => 0);
  const [prevInput, setPrevInput] = useState([]);
  console.log(prevInput);

  function clearConsole() {
    setInput("");
    setPrevInput([]);
  }

  function evaluateInput() {
    const _commands = commands;
    const _input = input.toLocaleLowerCase().trim();
    console.log(_input);
    return _commands.includes(_input) ? _input : "";
  }

  function handleEnterKey(e) {
    if (e.key !== "Enter") return;
    input.trim() !== "" ? setPrevInput((prev) => [...prev, input.trim()]) : null;
    if (evaluateInput() === "clear") {
      console.log("Clear console");
      clearConsole();
    }
    const textArea = document.querySelector("textarea");
    textArea.value = "";
    setInput("");
    setNumberOfLines((prev) => ++prev);
  }

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
      />
      <div className="lineContainer">
        {prevInput.map((_input) => {
          return <Prompt input={_input} />;
        })}
        <Prompt input={input} />
      </div>
    </div>
  );
}

export default App;
