import { useState } from 'react';
import { socket } from '../socket';

export function MyForm({setFooEvents}) {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    
    socket.timeout(5000).emit('submission', value, () => {
      setIsLoading(false);

    });
 
  }

  return (
    <div className='globalSubmit'>
       <form onSubmit={ onSubmit }>
        <input onChange={ e => setValue(e.target.value) } />
        <button type="submit" disabled={ isLoading }>Submit</button>
      </form>
    </div>
   
  );
}