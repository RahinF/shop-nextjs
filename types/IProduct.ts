interface IProduct {
  _id: string;
  title: string;
  description: string;
  image: string;
  sizes: {
    text: string;
    price: number;
  }[];
  extras: {
    text: string;
    price: number;
  }[];
}

export interface IProductRequest {
  title?: string;
  description?: string;
  image?: string;
  sizes?: {
    text?: string;
    price?: number;
  }[];
  extras?: {
    text?: string;
    price?: number;
  }[];
}

export default IProduct;
