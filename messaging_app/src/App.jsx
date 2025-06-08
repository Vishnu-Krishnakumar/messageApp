import { useState,useEffect } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login.jsx'
import { Link } from "react-router-dom";
import { socket } from './socket'
import { ConnectionState } from './components/ConnectionState.jsx';
import { ConnectionManager } from './components/ConnectionManager.jsx';
import { Events } from "./components/Events.jsx";
import { MyForm } from './components/MyForm.jsx';
import { Users } from './components/Users.jsx';
import LogOut  from './components/LogOut.jsx';
import MessageBox from './components/MessageBox.jsx'
function App() {
  const [count, setCount] = useState(0);
  const [verify, setVerify] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [users,setUsers] = useState([]);
  useEffect(() => {

    try{
      let token = localStorage.getItem("authToken");

      console.log(token);

      if(token === null) {
        setVerify(false);
        return;
      } 
      const currentTimestamp = Math.floor(Date.now() / 1000);
      token = token.split('.');
      let exp = JSON.parse(atob(token[1])).exp;
      token = JSON.parse(atob(token[1])).user;
      if(exp < currentTimestamp){
        localStorage.removeItem("authToken");
        return console.log("token expired");
        
      }
      else{
         setVerify(true);
      } 
    }catch(error){console.log(error)}

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
      // localStorage.removeItem("authToken");
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);
    
    socket.on('responses', (msg,userName)=>{
      console.log(userName);
      setFooEvents(previous => [...previous, {msg,userName}]);
    });

    socket.on('users',(newUser)=>{
      console.log("emitted " + newUser);
      setUsers(newUser);
      console.log(users);
    })

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
            <LogOut setVerify = {setVerify}></LogOut>
            <Users users ={users}></Users>
            <MessageBox></MessageBox>
            <ConnectionState isConnected={ isConnected } />
            <Events events={ fooEvents } />
            <ConnectionManager />
            <MyForm setFooEvents ={setFooEvents}/>
          </div>
          ))
       }
        
      </div>
    );
}

export default App
