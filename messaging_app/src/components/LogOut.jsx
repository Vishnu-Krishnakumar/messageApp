
function LogOut({setVerify}){
    function log(e){
      e.preventDefault();
      localStorage.removeItem("authToken")
      setVerify(false);
    }
    return(
      <>
        <nav className="logOut">
          <a href="" onClick={log}>Log Out</a>
        </nav>
      </>
    )
  }
  
  export default LogOut;