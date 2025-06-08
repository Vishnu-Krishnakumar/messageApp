
import { socket } from '../socket';

export function ConnectionManager() {
  
  function connect() {
    if (localStorage.getItem('authToken')) {
      socket.connect();
      let token = localStorage.getItem('authToken');
      console.log(token);
      socket.auth.token = token;
      socket.emit('authentication',  token );
    }
  }

  function disconnect() {
  
    socket.disconnect();
  }

  return (
    <>
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}