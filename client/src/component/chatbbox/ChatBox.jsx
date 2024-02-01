import React, { useState , useEffect,useRef} from "react";
import './ChatBox.css';

function ChatBox({template , show}) {

  const [messages, setMessages] = useState([

    {text :  "Hello bobby"  , name: "Hamza", time : "12:47"}
  ])

  const {url,background_color,image_width,image_height,image_align,chat_image,font_size} = template

  const formRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') === ""? "" : formData.get("message");
    const _message = {name: "hamza",time:"12:54",text: message}
    setMessages((prevArray => [...prevArray, _message]))
    formRef.current.reset()
  };
  const applyStyles = ()=>{
    const style = url
    ? {
        backgroundImage: `url(../../../public/background-images/${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }
    :{ background: `${background_color}` }
    

      return style
  }
  return (
     <section className="msger" style={{fontSize :`${font_size}px`}}>
      <main 
        className="msger-chat"  
        style={ applyStyles()}
        >
          <div 
          style={{textAlign:image_align}}
          >  
            <img 
                src={`../../../public/gallery-image/${chat_image}`}
                width={image_width} 
                height={image_height}
                className='img_chat'
            />
          </div>
        <div className="msg left-msg">
          <div className="msg-bubble" >
            <div className="msg-info">
              <div className="msg-info-name">BOBBY</div>
              <div className="msg-info-time">12:45</div>
            </div>

            <div className="msg-text">
              Hi 😄
            </div>
          </div>
        </div>

          {messages.map((message,index) =>{
            return(
              <div className="msg right-msg"  key={index}>
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">{message.name}</div>
                  <div className="msg-info-time">{message.time}</div>
                </div>
                <div className="msg-text">
                    {message.text}
                </div>
              </div>
              </div>
            )
          })}
           <div ref={chatEndRef} />
      </main>

     <form className="msger-inputarea"ref={formRef}
          onSubmit={handleSubmit}>
        <input type="text" className="msger-input" name='message'  placeholder="Enter your message..." />
        <button type="submit" className="msger-send-btn">Send</button>
      </form>
     </section>
  
  )
}

export default ChatBox;