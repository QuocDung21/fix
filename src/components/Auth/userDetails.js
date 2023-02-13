import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import AdminHome from "./AdminHome";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [dt, setDt] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://api-vuon-thong-minh.onrender.com/users/user-data", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.localStorage.setItem("Emaildetails", data.data.email);
        window.localStorage.setItem(
          "Namedateils",
          data.data.fname + " " + data.data.lname
        );
        window.localStorage.setItem("dataUser", JSON.stringify(data.data));
        if (data.data.userType == "Admin") {
          navigate("/adminhome");
          console.log(admin);
        } else {
          navigate("/home");
        }

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "/login";
        }
      });
  }, []);

  // return admin ? <AdminHome /> : <Home userData={userData} />;
}
