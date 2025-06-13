import { useEffect } from 'react';
import { socket } from '../socket';
import { retrieveMessages } from '../serverUtils/server';
export function Users({users,setTarget,userTarget,setPrivate,verify}){

    async function test(e){

      let socketId = '';
      let clickedId = parseInt(e.target.dataset.userId);
      for(const user of users){

        if(user.userID === parseInt(clickedId)){
          socketId = user.socketId;
        }
      }
      setTarget({id:clickedId,socketId:socketId,userName:e.target.dataset.userName});

      const messages = await retrieveMessages(clickedId,verify.user.id);
      setPrivate([]);
      let formattedMessages = [];
      for(const message of messages.userMessages){
        formattedMessages.push({msg:message.message,userName:message.userName});
      }
      setPrivate(formattedMessages);

    }

  return (
    <div className='user' >
    <h2>Users Online</h2>
    <ul className='usersList'>
      {
        users.map((user,index)=>{
          if (verify.user.id === user.userID) return null;
          return (
            <li onClick = {test} key ={user.userID} data-user-id = {user.userID} data-user-name = {user.userName}>{user.userName}</li> 
          )
        }) 
      }
    </ul>  
    </div> 
  )
}