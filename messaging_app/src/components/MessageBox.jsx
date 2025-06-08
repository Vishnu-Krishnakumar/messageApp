import { useState,useEffect } from 'react'
import { socket } from '../socket';

function MessageBox(){
const [privateMessage, setPrivate] = useState([]);
useEffect(()=>{
    socket.on('privateMessage',(content)=>{
        console.log(content.msg);
        setPrivate(privateMessage => [...privateMessage,content.msg]);
    })
    return () => {
      socket.off('privateMessage');
      };
})
    return(
        <div className="messageBox">
            {
              privateMessage.map((message,index)=>
                <p key = {index}>{message}</p>
              )
            }
        </div>
    )
}

export default MessageBox