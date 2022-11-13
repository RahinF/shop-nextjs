import ICartProduct from "./ICartProduct";

export type TStatusText = "Payment" | "Preparing" | "On the way" | "Delivered";

export interface IStatus {
  text: TStatusText;
  src: string;
  alt: string;
}

export interface IOrderResponse {
    _id: string;
    customer: string;
    address: string;
    products: ICartProduct[];
    total: number;
    status: TStatusText;
  }

export interface IOrderRequest {
    customer: string;
    address: string;
    products: ICartProduct[];
    total: number;
    status: string;
  }