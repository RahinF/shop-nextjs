import axios from "axios";
import { IOrderRequest, IOrderResponse } from "../types/IOrder";

export const fetchOrders = async (): Promise<IOrderResponse[]> => {
  return axios
    .get(`/api/orders`)
    .then((response) => response.data);
};

export const fetchOrder = async (id: string): Promise<IOrderResponse> => {
  return axios
    .get(`/api/orders/${id}`)
    .then((response) => response.data);
};

export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<{ message: string }> => {
  return axios
    .put(`/api/orders/${id}`, { status })
    .then((response) => response.data);
};

export const createOrder = async (data: IOrderRequest) => {
  return axios.post("/api/orders", { data });
};
