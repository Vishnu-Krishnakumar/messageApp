import { useState,useEffect } from 'react'
import { socket } from '../socket';
import { directMessage,retrieveMessages } from '../serverUtils/server';
function MessageBox({userTarget,privateMessage,setPrivate,verify}){
  const [value, setValue] = useState('');
 
  async function onSubmit(formData){

    if(parseInt(userTarget.id) !== verify.user.id){
      socket.emit('privateMessage',value,userTarget.socketId);
      const message = await directMessage(value,userTarget.id,verify.user.id);
      if(message){
        setPrivate(privateMessage => [...privateMessage,{msg:value,userName:verify.user.email}])
      }
    }
  }


  useEffect(()=>{
    socket.on('privateMessage',(content)=>{
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
      <h2>{userTarget.userName}</h2>
      <div className="chatMessages">
        
          {
            privateMessage.map((message,index)=>{
              if (message.userName === verify.user.email){return (<p className = "receiver" key = {index}>{`${message.userName}: ${message.msg}`}</p>)}
              else{
              return (<p className= "sender" key = {index}>{`${message.userName}: ${message.msg}`}</p>)
              }
              }
            )
          }
        <div id="anchor"></div>
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