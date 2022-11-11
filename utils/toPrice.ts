const toPrice = (number: number) => {
  return `$${(number / 100).toFixed(2)}`;
};

export default toPrice;
