import { useEffect, useState } from 'React'

const Github = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      window.open('http://github.com/sesamDev', '_blank')
      setLoading(false)
    }, 2000)
  }, [])
  return <>{loading ? <p>Redirecting to Github...</p> : <p>Redirected</p>}</>
}

export default Github
