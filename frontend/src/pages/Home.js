import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/home.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getGlobalState, setGlobalState } from "../GlobalState";
import Jdenticon from "react-jdenticon";

const { image, navBar, button, plusIcon } = styles;

function Home(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      getGlobalState("url") + "/get-shop?owner=" + getGlobalState("username")
    )
      .then((response) => response.json())
      .then((d) => {
        setData(d);
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
            navigate("/add-shop");
          }}
        >
          <AiOutlinePlusCircle size={30} className={plusIcon} />
          <h4
            style={{
              marginLeft: 5,
            }}
          >
            Add shop
          </h4>
        </button>
      </div>
      <div
        className="d-flex justify-content-start flex-wrap"
        style={{
          columnGap: 30,
        }}
      >
        {data.map((a, i) => {
          console.log(a);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                width: 400,
                height: 200,
                backgroundColor: "white",
                marginTop: "30px",
                borderRadius: "10px",
              }}
            >
              <Jdenticon size="200" value={a.name} />
              <div
                style={{
                  width: 200,
                  padding: 10,
                }}
                >
                <h1>{a.name}</h1>
                <h6
                  style={{
                    width: 180,
                    height: 130,
                    wordBreak:'break-word',
                    overflowY: 'scroll',
                    msOverflowStyle:"none"
                  }}
                >
                  {a.description}
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
