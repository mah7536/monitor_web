/** @format */
const axios = require("axios").default;

const API = axios.create({
  baseURL: process.env.API_Host,
  "Content-Type": "application/json",
});

export const Login = (data) =>
  API.post("/login", data)
    .then((res) => {
      console.log(data);
      return res.data;
    })
    .catch((err) => {
      return err;
    });
