
import {log} from "./serverUtils/server"
function Login({setLogin,logIn }) {

  async function logIn(formData) {
    const verified = await log(formData);
    console.log(verified);
    setLogin({user:verified.user, verify:verified.verify});
  }
  return (
    <>

      <form action ={logIn}>
        <label >Email:</label>
        <input type = "email" id = "email" name ="email"></input>
        <label >Password:</label>
        <input type ="password" id ="paswword" name ="password"></input>
        <button  type = "submit">LogIn</button>
      </form>

    </>
    )
}

export default Login;