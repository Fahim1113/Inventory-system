import styles from "../CSS/addEmployee.module.css";
import { useState } from "react";
import { getGlobalState } from "../GlobalState";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const { image, box, i, button } = styles;

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");

  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const inputStyle = {
    marginTop: "30px",
    marginLeft: "auto",
    marginRight: "auto",
    width: "45%",
  };
  return (
    <div>
      <img className={image} src={require("../images/logo.png")} alt="logo" />
      <div className={box}>
        <h2
          style={{
            textAlign: "center",
            marginTop: "20px",
            width: "100%",
          }}
        >
          Add Employee
        </h2>
        <input
          className={i}
          style={inputStyle}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className={i}
          style={inputStyle}
          placeholder="Address"
          type={"address"}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <input
          className={i}
          style={inputStyle}
          placeholder="Department"
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        />
        <input
          className={i}
          style={inputStyle}
          placeholder="Employee number"
          onChange={(e) => {
            setEmployeeNumber(e.target.value);
          }}
          type="number"
          onWheel={(e) => e.target.blur()}
        />
        <input
          className={i}
          style={inputStyle}
          placeholder="Bank account"
          onChange={(e) => {
            setBankAccount(e.target.value);
          }}
          type="number"
          onWheel={(e) => e.target.blur()}
        />
        <input
          className={i}
          style={inputStyle}
          placeholder="Tax rate (%)"
          onChange={(e) => {
            setTaxRate(e.target.value);
          }}
          type="number"
          onWheel={(e) => e.target.blur()}
        />
        <input
          className={i}
          style={inputStyle}
          placeholder="Insurance number"
          onChange={(e) => {
            setInsuranceNumber(e.target.value);
          }}
          type="number"
          onWheel={(e) => e.target.blur()}
        />
        <h6
          style={{
            position: "absolute",
            left: 425,
            top: 390,
            fontWeight: "normal",
            color: "red",
            fontSize: 15,
          }}
        >
          {err}
        </h6>
        <input
          type="submit"
          value="Add Employee"
          className={button}
          style={{
            marginTop: "30px",
            marginLeft: "auto",
            marginRight: "auto",
            width: "45%",
            fontSize: "large",
            height: 45,
          }}
          onClick={(e) => {
            e.preventDefault();
            if (
              name == "" ||
              address == "" ||
              department == "" ||
              employeeNumber == "" ||
              bankAccount == "" ||
              taxRate == "" ||
              insuranceNumber == ""
            ) {
              setErr("You can't leave any feilds black");
            } else {
              fetch(
                getGlobalState("url") +
                  "/add-employee?shopName=" +
                  state.name +
                  "&shopOwner=" +
                  state.owner +
                  "&name=" +
                  name.split(" ").join("+") +
                  "&address=" +
                  address.split(" ").join("+") +
                  "&department=" +
                  department.split(" ").join("+") +
                  "&employeeNumber=" +
                  employeeNumber +
                  "&bankAccount=" +
                  bankAccount.split(" ").join("+") +
                  "&taxRate=" +
                  taxRate +
                  "&insuranceNumber=" +
                  insuranceNumber
              )
                .then((response) => response.json())
                .then((response) => {
                  if (response.success) {
                    navigate("/view-employees", { state: state });
                  }
                });
            }
          }}
        />
      </div>
    </div>
  );
}
