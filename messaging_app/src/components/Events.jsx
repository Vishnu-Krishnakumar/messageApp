

export function Events({ events }) {
  return (
    <ul>
    {
      events.map((event, index) =>
        <li key={ index }>{ event.userName } : {event.msg}</li>
      )
    }
    </ul>
  );
}