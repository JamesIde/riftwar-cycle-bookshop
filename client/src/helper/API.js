import axios from "axios"

export const API = axios.create({
  baseURL: "https://riftwar-cycle-backend.azurewebsites.net",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
