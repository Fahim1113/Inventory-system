import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../CSS/viewShop.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { getGlobalState } from "../GlobalState";

const { navBar, image, button, plusIcon, itemText, sidebar, sidebarBtn } =
  styles;

function ViewEmployees(props) {
  const navigate = useNavigate();
  const {state}=useLocation();
  console.log(state)
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
            onClick={() => navigate("/add-employee", { state: state })}
          >
            <AiOutlinePlusCircle size={30} className={plusIcon} />
            <h4
              style={{
                marginLeft: 5,
              }}
            >
              Add employee
            </h4>
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ViewEmployees;
