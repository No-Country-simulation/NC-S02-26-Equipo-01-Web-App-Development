import { useNavigate } from "react-router";
import Button from "@/components/common/Button";
import { ErrorIcon } from "@/assets/icons";
import Header from "@/components/common/Header";

const CancelPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="cancel-page mb-12 flex flex-col items-center">
      <Header dataTestId="app-cancel-header" />

      <ErrorIcon className="w-26 h-26 fill-red-500 mt-8 mb-4" />

      <h1 className="text-4xl font-bold mb-4 text-center">Payment Canceled</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Your payment was not completed. No charges were made and your account
        has not been created.
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

      <Button
        isVariant="primary"
        onClick={() => navigate("/#app-section-pricing")}
      >
        Try Payment Again
      </Button>
      <Button onClick={() => navigate("/")}>Return to Home</Button>
    </div>
  );
};

export default CancelPage;
