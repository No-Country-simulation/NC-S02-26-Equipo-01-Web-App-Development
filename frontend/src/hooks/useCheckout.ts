import { TrackingContext } from "@/providers/TrackingContext";
import type { CheckoutPayload } from "@/types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";

const useCheckout = () => {
  const navigate = useNavigate();
  const { tracking } = useContext(TrackingContext);

  const [loading, setLoading] = useState(false);

  const handleCheckout = async ({ plan }: CheckoutPayload) => {
    try {
      setLoading(true);
      console.log("Checkout iniciado:", { plan, tracking });

      const payload = {
        productId: plan,
        successUrl: `${window.location.origin}/checkout/success`,
        cancelUrl: `${window.location.origin}/checkout/cancel`,
        gclid: tracking?.gclid ?? null,
        fbclid: tracking?.fbclid ?? null,
        campaign: tracking?.utm_campaign ?? null,
        source: tracking?.utm_source ?? null,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/checkout/create-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Error creando sesión de checkout");
      }

      const data = await response.json();

      if (!data.url) {
        throw new Error("Backend no devolvió URL de Stripe");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Error en el checkout:", error);
      handleCheckoutCancel();
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutCancel = () => {
    navigate("/checkout/cancel");
  };

  return { handleCheckout, loading };
};

export default useCheckout;
