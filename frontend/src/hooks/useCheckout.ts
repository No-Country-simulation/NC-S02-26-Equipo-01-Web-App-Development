import { TrackingContext } from "@/providers/TrackingContext";
import type { CheckoutPayload } from "@/types";
import { useContext } from "react";
import { useNavigate } from "react-router";

const useCheckout = () => {
  const navigate = useNavigate();
  const { tracking } = useContext(TrackingContext);

  const handleCheckoutSuccess = async ({ amount, plan }: CheckoutPayload) => {
    try {

      console.log("Checkout iniciado:", { amount, plan, tracking });

      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/checkout/success");
    } catch (error) {
      console.error("Error en el checkout:", error);
      handleCheckoutCancel();
    }
  };
  const handleCheckoutCancel = () => {
    navigate("/checkout/cancel");
  };

  return { handleCheckoutSuccess, handleCheckoutCancel };
};

export default useCheckout;
