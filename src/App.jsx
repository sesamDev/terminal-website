import './App.css'
import {useEffect, useState} from "react"


function captureKeystroke(e){
const input = e.target.value;
return input.slice(-1)
}
function App() {
  const [input, setInput] = useState(()=>[])
  useEffect(() => {
    console.log(input)
    
  }, [input])
  return (
    <div>
      <textarea onChange={(e)=> {
      setInput((prev) => [...prev,captureKeystroke(e)])}} />
      <p>{`guest@terminal:$ ${input.join("")}`}</p>
   </div>
  )
}

export default App
