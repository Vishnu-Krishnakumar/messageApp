import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import { Link } from "react-router-dom";
import { socket } from './socket'
import { ConnectionState } from './ConnectionState.jsx';
import { ConnectionManager } from './ConnectionManager.jsx';
import { Events } from "./Events";
import { MyForm } from './MyForm.jsx';
function App() {
  const [count, setCount] = useState(0);
  const [verify, setVerify] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
    
    socket.on('responses', (msg)=>{
      console.log(msg);
      setFooEvents(previous => [...previous, msg]);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
      socket.off('responses');
    };
    }, []);
 
    return (
      <div className="App">
        {(!verify? (
          <div>
            <Login setVerify = {setVerify}></Login>
            <Link to ="register">Register a new account!</Link>
          </div>):( 
          <div>
            <ConnectionState isConnected={ isConnected } />
            <Events events={ fooEvents } />
            <ConnectionManager />
            <MyForm setFooEvents ={setFooEvents}/>
          </div>
          ))
       }
        
      </div>
    );


  // return (
  //   <>
  //   {(!verify? (<div>
  //     <Login setVerify = {setVerify}></Login>
  //     <Link to ="register">Register a new account!</Link>
  //     </div>):null)
  //    }
  //   </>
  // )
}

export default App
