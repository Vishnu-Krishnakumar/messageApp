import { register } from "../serverUtils/server";
import { useNavigate } from 'react-router-dom';
function Register(){
  const navigate = useNavigate();
  async function registration(formData){
    let response = await register(formData);
    if(response === true){
      navigate('/');
    }
  }

  return(
    <div>
      <form className ="registrationForm" action ={registration}>
        <label>First Name:</label>
        <input type ="text" name ="firstname"></input>
        <label>Last Name:</label>
        <input type ="text" name ="lastname"></input>
        <label>Email:</label>
        <input type ="email" name ="email"></input>
        <label>Password:</label>
        <input type ="password" name ="password"></input>
        <label>Re type your password:</label>
        <input type ="password" name = "passwordRE"></input>
        <button type ="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;