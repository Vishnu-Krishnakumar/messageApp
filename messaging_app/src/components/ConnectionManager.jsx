
import { socket } from '../socket';

export function ConnectionManager({users,setUsers,setIsConnected}) {
  
  function connect() {
    if (localStorage.getItem('authToken')) {
      socket.connect();
      let token = localStorage.getItem('authToken');

      socket.auth.token = token;
      socket.emit('authentication',  token );
      socket.on('users',(newUser)=>{
        setUsers(newUser);

        setIsConnected(true);
      })
      
    }
  }

  function disconnect() {
  
    socket.disconnect();
    setUsers([]);
    setIsConnected(false);
  }

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}