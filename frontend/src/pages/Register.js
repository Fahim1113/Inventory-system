import { useState } from "react";
import styles from "../CSS/register.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { getGlobalState, setGlobalState } from "../GlobalState";

const { image, box, iu, i, button } = styles;

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [vPW1, setVPW1] = useState(false);
  const [vPW2, setVPW2] = useState(false);
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
          Register
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
            type={!vPW1 ? "password" : "text"}
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
              setVPW1(!vPW1);
            }}
          >
            {vPW1 ? (
              <AiOutlineEye size={35} />
            ) : (
              <AiOutlineEyeInvisible size={35} />
            )}
          </button>
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
            type={!vPW2 ? "password" : "text"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className={button}
            style={{
              marginRight: 0,
              width: 45,
              height: 45,
            }}
            onClick={() => {
              setVPW2(!vPW2);
            }}
          >
            {vPW2 ? (
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
            top: 270,
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
            value="Register"
            className={button}
            style={{
              height: 45,
              marginTop: 45,
              fontSize: "Large",
              width: "50%",
            }}
            onClick={(e) => {
              e.preventDefault();
              if (
                username === "" ||
                password === "" ||
                confirmPassword === ""
              ) {
                setError("Do not leave any fields empty");
              } else {
                if (password !== confirmPassword) {
                  setError("The passwords don't match");
                } else {
                  fetch(
                    getGlobalState("url") +
                      "/register?username=" +
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
                        setError("Username already taken");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
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
            navigate("/login");
          }}
        >
          Already have an account? Click here to login.
        </h6>
      </div>
    </div>
  );
}

export default Register;
