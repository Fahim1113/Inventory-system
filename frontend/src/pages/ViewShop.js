import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../CSS/viewShop.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { getGlobalState } from "../GlobalState";

const { navBar, image, button, plusIcon, itemText, sidebar, sidebarBtn } =
  styles;

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
        <div className="d-flex">
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
                `${getGlobalState("url")}/delete-shop?owner=${getGlobalState(
                  "username"
                )}&shopName=${state.name}`
              )
                .then((response) => response.json())
                .then((response) => {
                  navigate("/home");
                });
            }}
          >
            <AiOutlineMinusCircle size={30} className={plusIcon} />
            <h4
              style={{
                marginLeft: 5,
              }}
            >
              Remove Shop
            </h4>
          </button>
        </div>
      </div>
      <div
        className={`${sidebar} bg-light d-flex justify-content-center align-items-start p-2`}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/view-employees")}
      >
        <p
          style={{
            width: "100%",
            height: 50,
            fontSize: 30,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          className={sidebarBtn}
        >
          <BsPeople />
          {"  "}Employees
        </p>
      </div>
      <div
        style={{
          paddingLeft: 250,
        }}
      >
        {items.map((i, index) => {
          return (
            <div
              className="bg-light"
              style={{
                margin: "auto",
                marginTop: 30,
                wordBreak: "break-word",
                padding: 10,
                borderRadius: 10,
                width: "95%",
                cursor: "pointer",
                height: 120,
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate("/view-item", {
                  state: i,
                });
              }}
            >
              <div className="d-flex align-items-baseline">
                <h1
                  className={itemText}
                  style={{
                    height: "60px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {i.name}
                </h1>
                <h1
                  style={{
                    marginLeft: 30,
                  }}
                >
                  {i.price.split(".")[0]}.
                </h1>
                <h3>{i.price.split(".")[1] ? i.price.split(".")[1] : "00"}</h3>
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
