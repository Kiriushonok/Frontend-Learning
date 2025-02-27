import { useState, useEffect } from "react"
import "./Header.css"

export default function Header() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date), 1000)

    return () => clearInterval(interval)
  }, [])

  

    return (
        <header>
          <h3>Здесь текст</h3>
    
          <span>{now.toLocaleTimeString()}</span>
        </header>
    )
}