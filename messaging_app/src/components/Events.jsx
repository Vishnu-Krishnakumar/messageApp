import { useEffect } from "react";

import { socket } from '../socket';

export function Events({ events,setEvents }) {
  useEffect(()=>{
    const listener = ({ msg, username }) => {

      setEvents(prev => [...prev, { msg, username }]);
    };
    socket.on('responses', listener);
    return ()=>{
      socket.off('responses',listener);
    }
  },[]);

  return (
    <div>
    <h2>Global Chat</h2>
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event.username } : {event.msg}</li>
      )
    }
    </ul>
    </div>
  );
}