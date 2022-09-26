import axios from "axios"

export const API = axios.create({
  baseURL: "FIX THIS",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
