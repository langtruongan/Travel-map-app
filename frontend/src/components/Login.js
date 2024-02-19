import "../css/login.css";
import { Cancel, Room } from "@material-ui/icons";
import React from "react";
import axios from "axios";

export default function Login( {setShowLogin, myStorage, setCurrentUser}) {
  const [error, setError] = React.useState(false);
  const nameRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon"/>
        <span>AnPin</span>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={nameRef} />
        <input type="password" min="6" placeholder="password" ref={passwordRef} />
        <button className="loginBtn" type="submit">Login</button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
