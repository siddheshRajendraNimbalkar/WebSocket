import { useEffect, useState } from "react"

const App = () => {
  const [ socket , setSocket ] = useState<null | WebSocket>(null)
  const [ getMessage, setGetMessage] = useState<any[]>([])
  const [ value, setValue ] = useState("")

  useEffect(()=>{
    const Socket = new WebSocket("ws://localhost:8080")
    Socket.onopen = () => {
      setSocket(Socket)
    }
    Socket.onmessage = (message) => {
        setGetMessage((prevMessage) => [...prevMessage ,message])
    };
    return () => {
      Socket.close();
    };
  },[])

  if(!socket) {
    return "Connection to websocket"
  }
  const handelar = (e:any) =>{
    e.preventDefault()
    setValue(e.target.value)
  }
  return (
    <div>
        <input type="text" onChange={handelar}/>
        <button
          onClick={()=>{
            socket.send(value)
          }}
        >Send</button>
        {getMessage.map((message, index) => {
          return <li key={index}>{message.data}</li>
        })}
      
    </div>
  )
}

export default App