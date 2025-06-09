import { socket } from '../socket';

export function Users({users,setTarget,userTarget,setPrivate}){
    console.log(users);
    function test(e){
      console.log(e.target.id);
      setTarget(e.target.id);
      console.log(userTarget);
      setPrivate([]);
      socket.emit('privateMessage',"testing",e.target.id);
    
    }
  return (
    <ul>
      {
        users.map((user,index)=>
          <div className='user' key ={index}>
            <li onClick = {test} key ={user.userID} id = {user.socketId}>{user.userName}</li>
          </div> 
        )
      }
    </ul>
  )
}