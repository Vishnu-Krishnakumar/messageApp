
import { socket } from './socket';

export function ConnectionManager() {
  function connect() {
    if (localStorage.getItem('authToken')) {
      socket.connect();
      console.log(localStorage.getItem('authToken'));
      socket.emit('authentication', { token: localStorage.getItem('authToken') });
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