"use client"
import React, {useState} from 'react'
import axios from 'axios'



const sendChatToServer = async (chat) => {
  
  try{

    axios({
      method: "POST",
      url: "https://stackblitz.com/~/github.com/EmmanuelTheCoder/qa-bot-server/response",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        "content": chat
      }
    })
    .then(async (val) => {
      // console.log("return from upper func", val.data)
    })

  }catch (error){
    alert("an error occured while fetching", error)
  }
}

const system = {
  user: "3MTT bot",
  content: "Hi there! I am here to answer all your questions relating to 3MTT"
}


export default function Home() {
  const [chatContent, setChatContent] = useState([system])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    
    setIsThinking(true)

    
    if(input.trim() === ""){
      alert("Chat cannot be empty")
      setIsThinking(false)
      
    }else{
        setChatContent((prevState) => [...prevState, {user: "user", content: input}])

        try{

          axios({
            method: "POST",
            url: "https://stackblitz.com/~/github.com/EmmanuelTheCoder/qa-bot-server/response",
            headers: {
              "Content-Type": "application/json"
            },
            data: {
              "content": input
            },
          })
          .then(async (val) => {
          
             setInput("")

            setChatContent((prevState) => [...prevState, {
              user: "3MTT bot", content: val.data
            
            }])

             setInput("")
             setIsThinking(false)
          })
      
        }catch (error){
          alert("an error occured while fetching", error)
        }
          

        
      }
   

  

  }
  return (
    <div className="container">
      <div className="header">
        <h1>3MTT Chatbot</h1>
        <p>Ask anything about 3MTT and get response in seconds</p>
      </div>

        <div className="chat-area">
          <div className="chat-area-content">

           
            {chatContent.map((chat, index) =>{
                return(
                  <div key={index} className={`user-bot-chat ${chat.user}`}>
                    <p className='user-id'>{chat.user}</p>
                    <p className='user-content'>{chat.content}</p>
                  </div>
                )
            })}

            <p className={isThinking ? "thinking" : "notThinking"}>Generating response...</p>
            
          </div>
          <div className="type-area">
            <input type="text" placeholder="Ask any question about 3MTT" value={input} onChange={(e)=>setInput(e.target.value)}/>
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
    </div>
  )
}
