import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";

interface IPayPalButtonWrapper {
  amount: string;
  disabled: boolean;
  showSpinner: boolean;
  createOrder: (data: any) => void;
}

const PayPalButtonWrapper = ({
  amount,
  disabled,
  showSpinner,
  createOrder,
}: IPayPalButtonWrapper) => {
  const style = { height: 48, layout: "vertical" };
  const currency = "AUD";

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={disabled}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const shipping = details.purchase_units[0].shipping;

            createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
            });
          });
        }}
      />
    </>
  );
};

export default PayPalButtonWrapper;
