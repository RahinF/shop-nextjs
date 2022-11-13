interface ICartProduct {
  uuid?: string;
  id: string;
  size: string;
  extras: string[];
  quantity?: number;
}

export default ICartProduct;
