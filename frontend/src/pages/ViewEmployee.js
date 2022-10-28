import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../CSS/viewShop.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { getGlobalState } from "../GlobalState";

const { navBar, image, button, plusIcon, i } = styles;

function ViewEmployee(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(state.name);
  const [department, setDepartment] = useState(state.department);
  const [address, setAddress] = useState(state.address);
  const [employeeNumber, setEmployeeNumber] = useState(state.employeeNumber);
  const [bankAccount, setBankAccount] = useState(state.bankAccount);
  const [taxRate, setTaxRate] = useState(state.taxRate);
  const [insuranceNumber, setInsuranceNumber] = useState(state.insuranceNumber);

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
              getGlobalState("url") +
                "/delete-employee?shopName=" +
                state.shopName +
                "&shopOwner=" +
                state.shopOwner +
                "&name=" +
                state.name.split(" ").join("+") +
                "&address=" +
                state.address.split(" ").join("+") +
                "&department=" +
                state.department.split(" ").join("+") +
                "&employeeNumber=" +
                state.employeeNumber +
                "&bankAccount=" +
                state.bankAccount.split(" ").join("+") +
                "&taxRate=" +
                state.taxRate +
                "&insuranceNumber=" +
                state.insuranceNumber
            )
              .then((response) => response.json())
              .then((response) => {
                if (response.success) {
                  navigate("/view-employees", { state: state });
                }
              });
            navigate(-1);
          }}
        >
          <AiOutlineMinusCircle size={30} className={plusIcon} />
          <h4
            style={{
              marginLeft: 5,
            }}
          >
            Remove Employee
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
          Address:{" "}
          <input
            className={i}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </h1>
        <h1
          style={{
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Department:{" "}
          <input
            className={i}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </h1>
        <h1
          style={{
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Employee number:{" "}
          <input
            className={i}
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            type="number"
            onWheel={(e) => e.target.blur()}
          />
        </h1>
        <h1
          style={{
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Bank account:{" "}
          <input
            className={i}
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            type="number"
            onWheel={(e) => e.target.blur()}
          />
        </h1>
        <h1
          style={{
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Tax rate (%):{" "}
          <input
            className={i}
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            type="number"
            onWheel={(e) => e.target.blur()}
          />
        </h1>
        <h1
          style={{
            fontSize: 24,
            marginTop: 30,
          }}
        >
          Insurance number:{" "}
          <input
            className={i}
            value={insuranceNumber}
            onChange={(e) => setInsuranceNumber(e.target.value)}
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
                "/update-employee?shopName=" +
                state.shopName +
                "&shopOwner=" +
                state.shopOwner +
                "&name=" +
                state.name.split(" ").join("+") +
                "&address=" +
                state.address.split(" ").join("+") +
                "&department=" +
                state.department.split(" ").join("+") +
                "&employeeNumber=" +
                state.employeeNumber +
                "&bankAccount=" +
                state.bankAccount.split(" ").join("+") +
                "&taxRate=" +
                state.taxRate +
                "&insuranceNumber=" +
                state.insuranceNumber +
                "&nameNew=" +
                name.split(" ").join("+") +
                "&addressNew=" +
                address.split(" ").join("+") +
                "&departmentNew=" +
                department.split(" ").join("+") +
                "&employeeNumberNew=" +
                employeeNumber +
                "&bankAccountNew=" +
                bankAccount.split(" ").join("+") +
                "&taxRateNew=" +
                taxRate +
                "&insuranceNumberNew=" +
                insuranceNumber
            )
              .then((response) => response.json())
              .then((response) => {
                if (response.success) {
                  navigate("/view-employees", { state: {name: state.shopName, owner: state.shopOwner} });
                }
              });
          }}
        />
      </div>
    </div>
  );
}

export default ViewEmployee;
