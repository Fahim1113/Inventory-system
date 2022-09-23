import styles from "../CSS/addShop.module.css";
import { useState } from "react";
import { getGlobalState } from "../GlobalState";
import { useNavigate } from "react-router-dom";

export default function AddShop() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <img
        className={styles.image}
        src={require("../images/logo.png")}
        alt="logo"
      />
      <div className={styles.box}>
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
            width: "100%",
          }}
        >
          Add Shop
        </h2>
        <input
          className={styles.i + " row"}
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
          }}
          placeholder="Shop name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className={styles.i + " row"}
          style={{
            marginTop: "30px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
          }}
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h6
          style={{
            position: "absolute",
            left: 30,
            top: 230,
            fontWeight: "normal",
            color: "red",
            fontSize: 15,
          }}
        >
          {err}
        </h6>
        <input
          type="submit"
          value="Add Shop"
          className={styles.button}
          style={{
            height: 45,
            marginTop: 45,
            fontSize: "Large",
            width: "50%",
            marginLeft: "25%",
          }}
          onClick={(e) => {
            e.preventDefault();
            if (name === "" || description === "") {
              setErr("You can't leave any feilds black");
            } else {
              fetch(
                getGlobalState("url") +
                  "/add-shop?owner=" +
                  getGlobalState("username") +
                  "&name=" +
                  name +
                  "&description=" +
                  description
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    navigate("/home");
                  } else {
                    setErr(data.reason);
                  }
                });
            }
          }}
        />
      </div>
    </div>
  );
}
