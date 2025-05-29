
async function log(formData) {
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    let verified = {};
    await fetch("http://localhost:3000/login", {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {

        localStorage.setItem("authToken", response.token);
        let tokenArray = response.token.split('.');
        let user = JSON.parse(atob(tokenArray[1])).user;
        verified = {user:user , verify: true}
      })
      .catch((error) => console.error(error));
      return verified;
  }

async function register(formData){
    const body ={
      firstname:formData.get("firstname"),
      lastname:formData.get("lastname"),
      email:formData.get("email"),
      password:formData.get("password"),
      passwordRE:formData.get("passwordRE"),
      author:"false",
    }
    try{
    let response = await fetch (``,{
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(body),
     })
     if(response.status === 201){
      return true;
     }
     else return response.json();
    }catch(error){
  
      console.log(error);
    }
}

export {
    log,
    register,
}