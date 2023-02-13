import "./home.scss";
import React, { useEffect, useState, useCallback } from "react"; //react hooks
import DOAM from "../Chart/doam/DA";
import Doamdat from "../Chart/doamdat/doamdat";
import LiquidTank from "../Bottelwater/LiquidTank";
import ND from "../Chart/nhietdo/ND";
import Sidebar from "../Sidebar";
import Navb from "../navbar/Navb";
import { SetMeal } from "@mui/icons-material";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Home = (userData) => {
  const [doam, setDoam] = useState("");
  const [nhietdo, setNhietdo] = useState("");
  const [mhsensor, setMhsensor] = useState("");
  const [ultrasonic, setUltrasonic] = useState("");
  const [conn, setConn] = useState("");
  const [dt, setDt] = useState([""]);
  // const [name, setName] = useState([]);

  const rootElement = document.getElementById("bottlewater");

  const userEmail = window.localStorage.getItem("Emaildetails");

  let urls =
    "https://api-vuon-thong-minh.onrender.com/datas/datadetail/" + userEmail;
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(urls)
        .then((data) => {
          setNhietdo(data.data.data.nhietdo);
          setDoam(data.data.data.doam);
          setMhsensor(data.data.data.mhsensor);
          setUltrasonic(data.data.data.ultrasonic);
          setConn(data.data.data.connect);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();

    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getDt = async () => {
      const datauser = window.localStorage.getItem("dataUser");
      await setDt(JSON.parse(datauser));
    };
    getDt();
  }, []);
  console.log(dt._id);
  return (
    <>
      <div className="home">
        <ToastContainer />
        <Sidebar>
          <div className="homeContainer">
            <Navb />
            <div className="bangnhiet">
              <ND nhietdo={nhietdo} />
              <DOAM doam={doam} />
              <Doamdat mhsensor={mhsensor} />
            </div>
            <div className="wt">
              <LiquidTank water={ultrasonic} />
            </div>
            <div style={{ marginTop: "20" }}>
              <footer
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bolder",
                }}
              >
                © Copyright 2023
              </footer>
            </div>
          </div>
        </Sidebar>
      </div>
    </>
  );
};

export default Home;
