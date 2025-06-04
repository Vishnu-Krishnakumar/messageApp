
export function Users({users}){
    console.log(users);
  return (
    <ul>
      {
        users.map((user,index)=>
            <li key ={user.userID} id = {user.userID}>{user.userName}</li>
        )
      }
    </ul>
  )
}