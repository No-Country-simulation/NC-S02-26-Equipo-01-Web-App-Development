import Button from "@/components/common/Button";
import { useNavigate } from "react-router";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <h1 className="text-4xl font-bold mb-4">Thank you for your purchase!</h1>
      <p className="text-lg mb-8">
        Your transaction was successful. We appreciate your business.
      </p>
      <a href="/" className="text-blue-600 hover:underline">
        Return to Home
      </a>

      <h1>Gracias por tu suscripción</h1>
      <p>Tu pago fue confirmado correctamente.</p>
      <Button onClick={() => navigate("/")}>Volver al inicio</Button>
    </div>
  );
};

export default SuccessPage;
