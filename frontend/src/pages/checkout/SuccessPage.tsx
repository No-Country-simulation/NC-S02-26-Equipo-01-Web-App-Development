import Button from "@/components/common/Button";
import useCheckout from "@/hooks/useCheckout";
import { useNavigate } from "react-router";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { handleCheckoutCancel } = useCheckout();
  return (
    <div className="success-page">
      <h1 className="text-4xl font-bold mb-4">Thank you for your purchase!</h1>
      <p className="text-lg mb-8">
        Your transaction was successful. We appreciate your business.
      </p>

      <h1>Gracias por tu suscripción</h1>
      <p>Tu pago fue confirmado correctamente.</p>
      <Button onClick={() => navigate("/")}>Volver al inicio</Button>
      <Button
        className="mt-4 bg-red-600 hover:bg-red-700"
        onClick={handleCheckoutCancel}
      >
        Ir a cancel
      </Button>
    </div>
  );
};

export default SuccessPage;
