import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../CSS/viewEmployees.module.css";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { getGlobalState } from "../GlobalState";

const { navBar, image, button, plusIcon } = styles;

function ViewEmployees(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState();
  const tableData = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "calc(100%)",
    outline: "none",
  };

  useEffect(() => {
    fetch(
      getGlobalState("url") +
        "/get-employee?shopName=" +
        state.name +
        "&shopOwner=" +
        state.owner
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response);
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
      <table
        style={{
          width: "95%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          height: "auto",
          borderRadius: 10,
        }}
        className="bg-light table table-dark table-hover table-striped border border-light"
      >
        <thead>
          <tr>
            <th className="border">Name</th>
            <th className="border">Address</th>
            <th className="border">Department</th>
            <th className="border">Employee Number</th>
            <th className="border">Bank Account</th>
            <th className="border">Tax Rate (%)</th>
            <th className="border">Insurance Number</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((i, x) => {
            return (
              <tr
                className="bg-light"
                style={{ height: "60px", cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/view-employee", {
                    state: i,
                  });
                }}
                key={x}
              >
                <td className="border">
                  <p style={tableData}>{i.name}</p>
                </td>
                <td className="border">
                  <p style={tableData}>{i.address}</p>
                </td>
                <td className="border">
                  <p style={tableData}>{i.department}</p>
                </td>
                <td className="border">
                  <p style={tableData}>{i.employeeNumber}</p>
                </td>
                <td className="border">
                  <p style={tableData}>{i.bankAccount}</p>
                </td>
                <td className="border">
                  <p style={tableData}>{i.taxRate}</p>
                </td>
                <td className="border">
                  <p style={tableData}>{i.insuranceNumber}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployees;
