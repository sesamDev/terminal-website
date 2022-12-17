import React from 'react'

const Help = () => {
  return (
    <>
      <pre>{'help              Show available commands'}</pre>
      <pre>
        {
          'weather <city>    Show weather, only supports single word citys at the moment'
        }
      </pre>
      <pre>{'about             What is this site?'}</pre>
      <pre>{'clear             Clear screen'}</pre>
      <pre>{'github            Redirects to my github repo'}</pre>
    </>
  )
}

export default Help
