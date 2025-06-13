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
  const [userTarget,setTarget] = useState({});
  const [verify, setVerify] = useState({user:null,verify:false});
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [users,setUsers] = useState([]);
  const [privateMessage, setPrivate] = useState([]);
  useEffect(() => {

    try{
      let token = localStorage.getItem("authToken");

      if(token === null) {
        setVerify({user:null,verify:false});
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
         setVerify({user:token,verify:true});
      } 
    }catch(error){console.log(error)}

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
    
    // socket.on('responses', (msg,userName)=>{
    //   console.log(userName);
    //   setFooEvents(previous => [...previous, {msg,userName}]);
    // });

    socket.on('users',(newUser)=>{
      console.log("emitted " + newUser);
      setUsers(newUser);
      console.log(users);
    })

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);

    };
    }, []);


    return (
      <div className="App">
        {(!verify.verify? (
          <div>
            <Login setVerify = {setVerify}></Login>
            <Link to ="register">Register a new account!</Link>
          </div>):( 
          <div className='Main'>
            <LogOut setVerify = {setVerify}></LogOut>
            <div>
              <Users users ={users} setTarget = {setTarget} userTarget = {userTarget} setPrivate ={setPrivate} verify ={verify}></Users>
            </div>
            <div>
              <MessageBox verify = {verify} privateMessage ={privateMessage} setPrivate ={setPrivate} userTarget ={userTarget}></MessageBox>
              <ConnectionState isConnected={ isConnected }  />
              <Events events={ fooEvents } setEvents = {setFooEvents} />
              <ConnectionManager setUsers = {setUsers} users = {users}  setIsConnected= {setIsConnected} />
              <MyForm setFooEvents ={setFooEvents}/>
            </div>
          </div>
          ))
       }
        
      </div>
    );
}

export default App
