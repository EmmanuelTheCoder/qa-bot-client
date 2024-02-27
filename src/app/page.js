"use client"
import React, {useState} from 'react'
import axios from 'axios'


const sendChatToServer = async (chat) => {

  let response;
  axios({
    method: "POST",
    url: "http://localhost:8000/response",
    headers: {
      "Content-Type": "application/json"
    },
    data: {
      "content": chat
    }
  }).then(async (val) => {
    response = await val.data

    return response
  })
  console.log("response", response)
  return response
}

export default function Home() {
  const [chatContent, setChatContent] = useState([])
  const [input, setInput] = useState("")
  
  const handleSubmit = async (e) => {
    
    e.preventDefault()
    
    const chat = {
      user: "user",  
      content: input
    }
    
    setChatContent([...chatContent, {
      user: "user",
      content: input
    }])

      if(input.trim() === ""){
        alert("Chat cannot be empty")
      }else{
        const botResponse = await sendChatToServer(input)
        const response = {
          user: "bot",
          content: botResponse
        }
        setChatContent([...chatContent, response])
        console.log(botResponse)
        
        setInput("")
      }
   

    //console.log(input)

    // setChatContent([...chatContent, bot])


    // sendChatToServer(input)


  }
  console.log(chatContent)
  return (
    <div className="container">
      <div className="header">
        <h1>3MTT Chatbot</h1>
        <p>Ask anything about 3MTT and get response in seconds</p>
      </div>

        <div className="chat-area">
          <div className="chat-area-content">

            <p>some random text...</p>
            <p>more random text</p>
            <p>some more random text</p>

            
            {chatContent && chatContent.filter(val => val.user === "user").map((chat, index) => {
                return(
                  <div key={index}>
                    <p>{chat.content}</p>
                  </div>
                )
            })}

            {chatContent.filter(val => val.user === "bot").map((chat, index) => {
              return (
                <div key={index}>
                  <p>{chat.content}</p>
                </div>
              )
            })
            
            }
            

            
            <div className="type-area">
              <input type="text" placeholder="Ask any question about 3MTT" value={input} onChange={(e)=>setInput(e.target.value)}/>
              <button onClick={handleSubmit}>Send</button>
            </div>
          </div>
        </div>
    </div>
  )
}
