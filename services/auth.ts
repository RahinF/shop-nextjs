import axios from "axios";
import ILoginForm from "../types/ILoginForm";

export const login = async (data: ILoginForm) => {
  return axios.post("/api/login", data);
};
