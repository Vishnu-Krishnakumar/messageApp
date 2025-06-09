import { useState,useEffect } from 'react'
import { socket } from '../socket';

function MessageBox({userTarget,privateMessage,setPrivate}){
  const [value, setValue] = useState('');

  function onSubmit(event){
    event.preventDefault();
    socket.emit('privateMessage',value,userTarget);
  }


  useEffect(()=>{
    socket.on('privateMessage',(content)=>{
      console.log(content.from );
      console.log(userTarget);
      if(content.from === userTarget){
        setPrivate(privateMessage => [...privateMessage,{msg:content.msg,userName:content.userName}]);
      }
    })
    return () => {
      socket.off('privateMessage');
    };
  },[userTarget]);

  return(
    <div>
      <div className="chatBox">
          {
            privateMessage.map((message,index)=>
              <p key = {index}>{`${message.userName}: ${message.msg}`}</p>
            )
          }
      </div>
      <div className='messageSend'> 
        <form onSubmit={ onSubmit }>
          <input  onChange={ e => setValue(e.target.value)}/>
          <button type="submit" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default MessageBox