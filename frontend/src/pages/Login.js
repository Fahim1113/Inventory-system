import { useState } from "react";
import styles from "../CSS/login.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getGlobalState, setGlobalState } from "../GlobalState";

const { image, box, iu, i, button, loginRegister, w90 } = styles;

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [vPW, setVPW] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <img className={image} src={require("../images/logo.png")} alt="logo" />
      <div className={box}>
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Login
        </h2>
        <div
          style={{
            width: "100%",
            marginTop: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 10,
            borderColor: "black",
          }}
        >
          <input
            className={`${i} ${iu}`}
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div
          style={{
            width: 360,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginLeft: 20,
          }}
        >
          <input
            className={`${i}`}
            style={{
              width: 320,
              marginRight: 6,
            }}
            type={!vPW ? "password" : "text"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={button}
            style={{
              marginRight: 0,
              width: 45,
              height: 45,
            }}
            onClick={() => {
              setVPW(!vPW);
            }}
          >
            {vPW ? (
              <AiOutlineEye size={35} />
            ) : (
              <AiOutlineEyeInvisible size={35} />
            )}
          </button>
        </div>
        <h6
          style={{
            position: "absolute",
            left: 30,
            top: 205,
            fontWeight: "normal",
            color: "red",
            fontSize: 15,
          }}
        >
          {error}
        </h6>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            type="submit"
            value="Login"
            className={button}
            style={{
              height: 45,
              marginTop: 45,
              fontSize: "Large",
              width: "50%",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (username === "" || password === "") {
                setError("Do not leave any fields empty");
              } else {
                fetch(
                  getGlobalState("url") +
                    "/login?username=" +
                    username.toString().split(" ").join("+") +
                    "&password=" +
                    password.toString().split(" ").join("+")
                )
                  .then((response) => response.json())
                  .then((data) => {
                    if (data.success) {
                      setGlobalState("username", username);
                      setGlobalState("password", password);
                      navigate("/home");
                    } else {
                      setError("Username or password is incorrect");
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }}
          />
        </div>
        <h6
          style={{
            textAlign: "center",
            marginTop: 15,
            textDecoration: "underline",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/register");
          }}
        >
          Don't have an account? Click here to register.
        </h6>
      </div>
    </div>
  );
}

export default Login;
