import "./App.css";

import { useEffect, useState } from "react";

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
        <p>{`${user} ${input}`}</p>
        <Prompt active={true} input={props.input} depth={props.depth - 1} />
      </>
    );

  return (
    <>
      <p>{`${user} ${input}`}</p>
    </>
  );
}

function App() {
  const [input, setInput] = useState(() => "");
  const [numberOfLines, setNumberOfLines] = useState(() => 0);
  console.log(numberOfLines);

  function handleEnterKey(e) {
    if (e.key !== "Enter") return;
    const textArea = document.querySelector("textarea");
    textArea.value = "";

    setNumberOfLines((prev) => ++prev);

    return console.log(e.key);
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      handleEnterKey(e);
    });
    return () => {
      // document.removeEventListener("keydown", (e) => {
      //   handleEnterKey(e);
      // });
    };
  }, []);
  return (
    <div className="mx-4">
      <textarea
        onChange={(e) => {
          setInput(captureKeystroke(e));
        }}
      />
      <Prompt active={true} input={input} depth={numberOfLines} />
    </div>
  );
}

export default App;
