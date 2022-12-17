import './App.css'
import { useEffect, useState } from 'react'

import About from './compontents/About'
import Error from './compontents/Error'
import Help from './compontents/Help'
import Github from './compontents/Github'
import Prompt from './compontents/Prompt'
import Weather from './compontents/Weather'
import uniqid from 'uniqid'

// Captures every keystroke and returns it as a string
function captureKeystroke(e) {
  const input = e.target.value
  return input
}

// Returns input as an array of strings
// so that an optional argument can be passed to the command
function userInputToArray(userInput) {
  return userInput.split(' ').filter((str) => {
    return /\S/.test(str)
  })
}

// Main function
const App = () => {
  const [input, setInput] = useState(() => '')
  const [prevInput, setPrevInput] = useState([])
  const [tree, setTree] = useState([])

  function executeInput(command) {
    let cmd = command[0]
    const args = command[1]

    const date = new Date()
    switch (command.length === 0 ? (cmd = '') : cmd.toLowerCase()) {
      case 'clear':
        return clearConsole()
      case 'about':
        return setTree((prev) => [
          ...prev,
          <Prompt input={cmd} key={uniqid()} />,
          <About key={uniqid()} />,
        ])
      case 'github':
        return setTree((prev) => [
          ...prev,
          <Prompt input={cmd} key={uniqid()} />,
          <Github key={uniqid()} />,
        ])
      case 'weather':
        return setTree((prev) => [
          ...prev,
          <Prompt input={cmd} key={uniqid()} />,
          <Weather key={uniqid()} city={args} />,
        ])
      case '':
        return setTree((prev) => [
          ...prev,
          <Prompt input={''} key={uniqid()} />,
        ])
      case 'help':
        return setTree((prev) => [
          ...prev,
          <Prompt input={cmd} key={uniqid()} />,
          <Help key={uniqid()} />,
        ])
      default: // If command is not found
        return setTree((prev) => [
          ...prev,
          <Prompt input={cmd} key={uniqid()} />,
          <Error command={cmd} key={uniqid()} />,
        ])
    }
  }

  // Resets the console to the initial state
  function clearConsole() {
    setInput('')
    setTree([])
  }

  // Handles what happens after enter key has been pressed
  function handleEnterKey(e) {
    if (e.key !== 'Enter') return // Ignore if key isn't enter and return

    // Remove newline character which is present since
    // we take the input in a textarea element
    const userInput = input.trim()

    // If the users input isn't empty, then save it as a previous input
    userInput !== '' ? setPrevInput((prev) => [...prev, input.trim()]) : null

    // Turn input into an array so that we can check for
    // optional argument to the command
    const inputAsArray = userInputToArray(userInput)
    // Executes input
    executeInput(inputAsArray)

    // Clear the input area
    const textArea = document.querySelector('textarea')
    textArea.value = ''

    // Reset the input
    setInput('')
  }

  // Adds eventhandler to capture when enter key is pressed
  useEffect(() => {
    document.addEventListener('keydown', handleEnterKey)
    return () => {
      document.removeEventListener('keydown', handleEnterKey)
    }
  }, [handleEnterKey])
  return (
    <div className='m-4'>
      <textarea
        onChange={(e) => {
          setInput((prev) => (prev = captureKeystroke(e)))
        }}
        autoFocus={true}
        onBlur={({ target }) => target.focus()}
        className='absolute -left-80'
      />
      <div className='lineContainer'>
        {tree.map((component) => component)}
        <Prompt className='mainInput' input={input} />
      </div>
    </div>
  )
}

export default App
