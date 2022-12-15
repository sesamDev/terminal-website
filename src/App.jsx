import "./App.css";

import { useEffect, useState } from "react";

import { commands } from "./data/commands";

function captureKeystroke(e) {
  const input = e.target.value;
  return input;
}

function Prompt(props) {
  const [input, setInput] = useState(() => "");
  let active = props.active;
  const user = "guest@terminal:~$";

  useEffect(() => {
    if (active) {
      setInput(props.input);
    }
  }, [props.input]);

  if (props.depth !== 0)
    return (
      <>
        {(active = false)}
        <p className="promptLine">{`${user} ${input}`}</p>
        <Prompt active={true} input={props.input} depth={props.depth - 1} />
      </>
    );

  return (
    <>
      <p className="promptLine">{`${user} ${input}`}</p>
    </>
  );
}

function App() {
  const [input, setInput] = useState(() => "");
  const [numberOfLines, setNumberOfLines] = useState(() => 0);

  function clearConsole() {
    setInput((prev) => (prev = ""));
    setNumberOfLines((prev) => (prev = 0));
  }

  // function renderLines(numberOfLinesToRender){
  //   if(numberOfLinesToRender === 0) return
  //   renderLines(numberOfLinesToRender -1)
  //   return <Prompt active={true} input={input}/>
  // }

  function evaluateInput() {
    const _commands = commands;
    const _input = input.toLocaleLowerCase().trim();
    console.log(_input);
    return _commands.includes(_input) ? _input : "";
  }

  function handleEnterKey(e) {
    console.log("Key pressed: " + e.key);
    if (e.key !== "Enter") return;
    if (evaluateInput() === "clear") {
      console.log("Clear console");
      clearConsole();
    }
    const textArea = document.querySelector("textarea");
    textArea.value = "";

    setNumberOfLines((prev) => ++prev);
  }

  function test(e) {
    return console.log(e);
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
      <Prompt active={true} input={input} depth={numberOfLines} />
    </div>
  );
}

export default App;
