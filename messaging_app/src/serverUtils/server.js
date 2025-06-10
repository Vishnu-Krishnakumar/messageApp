
async function log(formData) {
    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    let verified = {};
    try{
      const response = await  fetch("http://localhost:3000/login",{
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data.token);
      localStorage.setItem("authToken", data.token);
      console.log(localStorage.getItem('authToken'));
      let tokenArray = data.token.split('.');
      let user = JSON.parse(atob(tokenArray[1])).user;
      verified = {user:user,verify:true}
    }catch(error){
      console.log(error)
    }
    return verified;
  }

async function register(formData){
    const body ={
      firstname:formData.get("firstname"),
      lastname:formData.get("lastname"),
      email:formData.get("email"),
      password:formData.get("password"),
      passwordRE:formData.get("passwordRE"),
    }
    try{
    let response = await fetch (`http://localhost:3000/register`,{
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

async function directMessage(message,receiverId,userId){
  const body = {
    message:message,
    senderId:userId,
    receiverId:parseInt(receiverId),
  }
  try{
    let response = await fetch('http://localhost:3000/directMessage',{
    mode:"cors",
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(body),
    });
    if(response.status ===201){
      return true;
    }
    else return false;
  }catch(error){
    console.log(error);
  }
}

async function retrieveMessages(receiverId,userId){
  const body ={
    receiverId : receiverId,
    userId : userId,
  }
  try{
    let response = await fetch('http://localhost:3000/retrieveHistory',{
      mode:"cors",
      method: "POST",
      credentials: "include",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(body),
    });
    if(response.status === 200){
      return response.messages;
    }
    else return false;
  }catch(error){
    console.log(error)
  }
}

export {
    log,
    register,
    directMessage,
    retrieveMessages,
}