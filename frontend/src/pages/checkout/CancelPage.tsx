import { useNavigate } from "react-router";
import Button from "@/components/common/Button";
import { ErrorIcon } from "@/assets/icons";
import logoTax from "@assets/img/logo_taxServices.png";

const CancelPage = () => {
  const navigate = useNavigate();

  //TODO: Cambiar el mensaje de cancelación por el mensaje real que se reciba del backend.

  return (
    <div className="cancel-page mb-12 flex flex-col items-center">
      <div className="flex flex-col items-center mt-2">
        <img src={logoTax} className="w-10" alt="Tax Services Logo" />
        <div className="text-xl font-extrabold text-primary-hover">
          TAX
          <span className="text-primary-hover font-light">Services</span>
        </div>
      </div>

      <ErrorIcon className="w-26 h-26 fill-red-500 mt-8 mb-4" />

      <h1 className="text-4xl font-bold mb-4 text-center">
        Payment Could Not Be Completed
      </h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Your payment was canceled and no charges were made. Your account has not
        been created.
      </p>

      <div className="bg-gray-100 p-7 rounded-lg my-8">
        <p className="text-lg mb-4 max-w-md">
          Transactional state:{" "}
          <span className="font-mono text-sm text-gray-500">Canceled</span>
        </p>
        <p className="text-lg mb-4 max-w-md">
          Message:{" "}
          <span className="font-mono text-sm text-gray-500">
            The payment was canceled by the user.
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
        Try Payment Again
      </Button>
      <Button onClick={() => navigate("/")}>Return to Home</Button>
    </div>
  );
};

export default CancelPage;
