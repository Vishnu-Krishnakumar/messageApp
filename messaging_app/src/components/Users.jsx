import { useEffect } from 'react';
import { socket } from '../socket';

export function Users({users,setTarget,userTarget,setPrivate}){
    console.log(users);
    function test(e){
      console.log(e.target.id);
      let socketId = '';
      for(const user of users){
        console.log(user);
        if(user.userID === parseInt(e.target.id)){
          socketId = user.socketId;
        }
      }
      setTarget({id:e.target.id,socketId:socketId});
      console.log(userTarget);
      setPrivate([]);
      socket.emit('privateMessage',"testing",userTarget.socketId);
    }
  useEffect(()=>{

  },[users]);
  return (
    <ul>
      {
        users.map((user,index)=>
          <div className='user' key ={index}>
            <li onClick = {test} key ={user.userID} id = {user.userID}>{user.userName}</li>
          </div> 
        )
      }
    </ul>
  )
}