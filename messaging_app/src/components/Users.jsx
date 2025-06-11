import { useEffect } from 'react';
import { socket } from '../socket';

export function Users({users,setTarget,userTarget,setPrivate}){
    console.log(users);

    function test(e){
      console.log(e.target.id);
      let socketId = '';
      let clickedId = parseInt(e.target.dataset.userId);
      for(const user of users){
        console.log(user);
        if(user.userID === parseInt(clickedId)){
          socketId = user.socketId;
        }
      }
      setTarget({id:clickedId,socketId:socketId});
      console.log(userTarget);
      setPrivate([]);
    }

  return (
    <ul>
      {
        users.map((user,index)=>
          <div className='user' key ={index}>
            <li onClick = {test} key ={user.userID} data-user-id = {user.userID}>{user.userName}</li>
          </div> 
        )
      }
    </ul>
  )
}