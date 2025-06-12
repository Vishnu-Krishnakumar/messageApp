import { useState,useEffect } from 'react'
import { socket } from '../socket';
import { directMessage,retrieveMessages } from '../serverUtils/server';
function MessageBox({userTarget,privateMessage,setPrivate,verify}){
  const [value, setValue] = useState('');
  const [history,setHistory] = useState([]);
  
  async function onSubmit(formData){
    console.log(verify);
    console.log(userTarget);
    if(parseInt(userTarget.id) !== verify.user.id){
      const history = await retrieveMessages(userTarget.id,verify.user.id);
      console.log(history);
      const message = await directMessage(value,userTarget.id,verify.user.id);
      console.log(message);
      if(message){
        socket.emit('privateMessage',value,userTarget.socketId);
        setPrivate(privateMessage => [...privateMessage,{msg:value,userName:verify.user.email}])
      }
    }
  }


  useEffect(()=>{
    socket.on('privateMessage',(content)=>{
      console.log(content.from );
      console.log(userTarget);
      if(content.from === userTarget.socketId){
        setPrivate(privateMessage => [...privateMessage,{msg:content.msg,userName:content.userName}]);
      }
    })
    return () => {
      socket.off('privateMessage');
    };
  },[userTarget]);

  return(
    <div className="messageBox">
      <div className="chatMessages">
        <h2>{userTarget.userName}</h2>
          {
            privateMessage.map((message,index)=>
              <p key = {index}>{`${message.userName}: ${message.msg}`}</p>
            )
          }
      </div>
      <div className='messageSend'> 
        <form action={ onSubmit }>
          <input  onChange={ e => setValue(e.target.value)}/>
          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default MessageBox