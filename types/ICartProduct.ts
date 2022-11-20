interface ICartProduct {
  uuid?: string;
  id: string;
  base: string;
  extras: string[];
  quantity?: number;
}

export default ICartProduct;
