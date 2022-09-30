import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../CSS/viewShop.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { getGlobalState } from "../GlobalState";

const { navBar, image, button, plusIcon, i } = styles;

function ViewItem(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(state.name);
  const [price, setPrice] = useState(state.price);
  const [stock, setStock] = useState(state.stock);

  return (
    <div>
      <div className={navBar + " bg-light text-dark"}>
        <img
          src={require("../images/logo-dark.png")}
          className={image}
          alt="logo"
        />
        <button
          className={button}
          style={{
            height: 42,
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingLeft: 15,
            paddingRight: 15,
            textAlign: "center",
          }}
          onClick={() => {
            fetch(
              `${getGlobalState("url")}/delete-item?owner=${getGlobalState(
                "username"
              )}&shopName=${state.shopName}&name=${state.name}`
            )
              .then((response) => response.json())
              .then((response) => {
                navigate(-1);
              });
          }}
        >
          <AiOutlineMinusCircle size={30} className={plusIcon} />
          <h4
            style={{
              marginLeft: 5,
            }}
          >
            Remove Item
          </h4>
        </button>
      </div>
      <div
        className="bg-light"
        style={{
          padding: 60,
          margin: 45,
          borderRadius: 10,
        }}
      >
        <h1
          style={{
            fontSize: 24,
          }}
        >
          Name:{" "}
          <input
            className={i}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </h1>
        <h1
          style={{
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Price:{" "}
          <input
            className={i}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </h1>
        <h1
          style={{
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Stock:{" "}
          <input
            className={i}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            onWheel={(e) => e.target.blur()}
          />
        </h1>
        <input
          type="button"
          className={button}
          style={{
            height: 42,
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingLeft: 15,
            paddingRight: 15,
            textAlign: "center",
            marginTop: 30,
          }}
          value="Save changes"
          onClick={(e) => {
            e.preventDefault();
            fetch(
              getGlobalState("url") +
                `/update-item?owner=${getGlobalState("username")}&shopName=${
                  state.shopName
                }&name=${
                  state.name
                }&newName=${name}&newPrice=${price}&newStock=${stock}`
            )
              .then((response) => response.json())
              .then(() => {
                navigate(-1)
              });
          }}
        />
      </div>
    </div>
  );
}

export default ViewItem;
