import { useEffect } from 'react';
import { socket } from '../socket';
import { retrieveMessages } from '../serverUtils/server';
export function Users({users,setTarget,userTarget,setPrivate,verify}){
    console.log(users);
    async function test(e){
      console.log(e.target.id);
      let socketId = '';
      let clickedId = parseInt(e.target.dataset.userId);
      for(const user of users){
        console.log(user);
        if(user.userID === parseInt(clickedId)){
          socketId = user.socketId;
        }
      }
      setTarget({id:clickedId,socketId:socketId,userName:e.target.dataset.userName});
      console.log(userTarget);
      const messages = await retrieveMessages(userTarget.id,verify.user.id);
      setPrivate([]);
      for(const message of messages.userMessages){
        setPrivate(privateMessage =>[...privateMessage,{msg:message.message,userName:message.userName}]);
      }
    }

  return (
    <div className='user' >
    <h2>Users Online</h2>
    <ul className='usersList'>
      {
        users.map((user,index)=>
            
              <li onClick = {test} key ={user.userID} data-user-id = {user.userID} data-user-name = {user.userName}>{user.userName}</li>
        )
      }
    </ul>  
    </div> 
  )
}