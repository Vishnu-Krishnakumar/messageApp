import { io } from "socket.io-client";
const url = "http://localhost:3000/";
export const socket = io(url,{
    autoConnect:false,
    auth:{
        token: `${localStorage.getItem('authToken')}`
    }
});