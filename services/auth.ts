import axios from "axios";
import ILoginForm from "../types/ILoginForm";

export const login = async (data: ILoginForm) => {
  return axios.post("http://localhost:3000/api/login", data);
};
