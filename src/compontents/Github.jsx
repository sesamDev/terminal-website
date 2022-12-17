import React, { useState, useEffect } from 'react'

const Github = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      window.open('http://github.com/sesamDev/terminal-website', '_blank')
      setLoading(false)
    }, 2000)
  }, [])
  return <>{loading ? <p>Redirecting to Github...</p> : <p>Redirected</p>}</>
}

export default Github
