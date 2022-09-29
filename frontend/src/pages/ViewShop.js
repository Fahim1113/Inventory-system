import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../CSS/viewShop.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getGlobalState } from "../GlobalState";

const { navBar, image, button, plusIcon } = styles;

function ViewShop(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      `${getGlobalState("url")}/get-item?owner=${getGlobalState(
        "username"
      )}&shopName=${state.name}`
    )
      .then((response) => response.json())
      .then((response) => {
        setItems(response);
      });
  }, []);

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
            navigate("/add-item", {
              state: state,
            });
          }}
        >
          <AiOutlinePlusCircle size={30} className={plusIcon} />
          <h4
            style={{
              marginLeft: 5,
            }}
          >
            Add item
          </h4>
        </button>
      </div>
      <div>
        {items.map((i, index) => {
          return (
            <div
              className="bg-light"
              style={{
                margin: 10,
                marginTop: 30,
                wordBreak: "break-word",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <div className="d-flex align-items-baseline">
                <h1>{i.name}</h1>
                <h1 style={{
                  marginLeft: 30,
                }}>{i.price.split(".")[0]}.</h1>
                <h1 style={{
                  fontSize: 20,
                }}>{i.price.split(".")[1]}</h1>
              </div>
              <h3>{i.stock} in stock</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewShop;
