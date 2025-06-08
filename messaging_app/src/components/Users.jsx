import { socket } from '../socket';

export function Users({users}){
    console.log(users);
    function test(e){
      console.log(e.target.id);
      socket.emit('privateMessage',"testing",e.target.id);
    }
  return (
    <ul>
      {
        users.map((user,index)=>
            <li onClick = {test} key ={user.userID} id = {user.socketId}>{user.userName}</li>
        )
      }
    </ul>
  )
}