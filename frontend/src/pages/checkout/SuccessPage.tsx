import Button from "@/components/common/Button";
import useCheckout from "@/hooks/useCheckout";
import { useNavigate } from "react-router";
import logoTax from "@assets/img/logo_taxServices.png";
import { CheckIcon } from "@/assets/icons";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { handleCheckoutCancel } = useCheckout();

  //TODO: Cambiar el ID de transacción y el email del usuario por los datos reales de la transacción exitosa, hacer petición al backend para obtener esta información.

  return (
    <div className="success-page mb-12 flex flex-col items-center">
      <div className="flex flex-col items-center mt-2">
        <img src={logoTax} className="w-10" alt="Tax Services Logo" />
        <div className="text-xl font-extrabold text-primary-hover">
          TAX
          <span className="text-primary-hover font-light">Services</span>
        </div>
      </div>

      <CheckIcon className="w-26 h-26 fill-green-500 mt-8 mb-4 animate-bounce [animation-duration:0.9s] [animation-iteration-count:2.5]" />

      <h1 className="text-4xl font-bold mb-4 text-center">
        Thank you for your purchase!
      </h1>
      <p className="text-lg mb-8 text-center max-w-md">
        We have successfully processed your payment and your account has been
        created.
      </p>

      <h2 className="text-2xl font-bold mb-4"> We appreciate your business.</h2>

      <div className="bg-gray-100 p-7 rounded-lg my-8">
        <p className="text-lg mb-4 max-w-md">
          Transactional ID:{" "}
          <span className="font-mono text-sm text-gray-500">#1234567890</span>
        </p>
        <p className="text-lg mb-4 max-w-md">
          User email:{" "}
          <span className="font-mono text-sm text-gray-500">
            user@example.com
          </span>
        </p>
        <p className="text-sm mb-4 max-w-md">
          If you have any questions or need assistance, please contact our
          support team at{" "}
          <a
            href="mailto:support@taxservices.com"
            className="text-blue-700 hover:underline"
          >
            support@taxservices.com
          </a>
          .
        </p>
      </div>

      <Button isVariant="primary" onClick={() => navigate("/")}>
        Return to Home
      </Button>
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
