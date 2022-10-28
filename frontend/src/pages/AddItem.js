import styles from "../CSS/addItem.module.css";
import { useState } from "react";
import { getGlobalState } from "../GlobalState";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(0);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
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
          Add Item
        </h2>
        <input
          className={styles.i + " row"}
          style={{
            marginTop: "40px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
          }}
          placeholder="Item name"
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
          placeholder="Price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          onWheel={(e) => e.target.blur()}
        />
        <input
          className={styles.i + " row"}
          style={{
            marginTop: "30px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
          }}
          placeholder="Stock"
          onChange={(e) => {
            setStock(e.target.value);
          }}
          type="number"
          onWheel={(e) => e.target.blur()}
        />
        <h6
          style={{
            position: "absolute",
            left: 30,
            top: 305,
            fontWeight: "normal",
            color: "red",
            fontSize: 15,
          }}
        >
          {err}
        </h6>
        <input
          type="submit"
          value="Add Item"
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
            if (name === "" || price === "" || stock === "") {
              setErr("You can't leave any feilds black");
            } else {
              fetch(
                getGlobalState("url") +
                  "/add-item?owner=" +
                  getGlobalState("username") +
                  "&name=" +
                  name +
                  "&price=" +
                  price +
                  "&stock=" +
                  stock +
                  "&shopName=" +
                  state.name
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.success) {
                    navigate("/view-shop", { state: state });
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
