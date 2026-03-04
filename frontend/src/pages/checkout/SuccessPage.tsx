import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import { CheckIcon, ErrorIcon } from "@/assets/icons";
import type { CheckoutSessionResponse } from "@/types";

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } = useQuery<CheckoutSessionResponse>({
    queryKey: ["checkout-session", sessionId],
    queryFn: async () => {
      if (!sessionId) {
        throw new Error("Missing session_id");
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/checkout/session/${sessionId}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch session");
      }

      return res.json();
    },
    enabled: !!sessionId,
    retry: 1, 
  });

  if (isLoading) {
    return (
      <div className="success-page mb-12 flex flex-col items-center min-h-[80vh]">
        <Header dataTestId="app-success-header-loading" />
        <div className="flex flex-col items-center justify-center flex-1 w-full">
          <div className="w-14 h-14 border-4 border-gray-300 border-t-primary-hover rounded-full animate-spin"></div>
          <p className="mt-6 text-gray-600">Processing your transaction...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="success-page mb-12 flex flex-col items-center min-h-[80vh] bg-gray-50">
        <Header dataTestId="app-success-header-error" />

        <div className="flex flex-1 w-full items-center justify-center px-6">
          <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center border border-gray-100">
            <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-red-100 mb-6">
              <ErrorIcon className="w-15 h-15 fill-red-500" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              Transaction Not Found
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              We couldn’t locate your transaction. This may happen if the
              session expired or the payment process was interrupted.
            </p>

            <Button onClick={() => navigate("/")}>Return Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page mb-12 flex flex-col items-center min-h-[80vh]">
      <Header dataTestId="app-success-header" />
      <div className="flex flex-col items-center justify-center flex-1 w-full transition-all duration-300">
        <CheckIcon className="w-26 h-26 fill-green-500 mt-8 mb-4 animate-bounce [animation-duration:0.9s] [animation-iteration-count:2.5]" />

        <h1 className="text-4xl font-bold mb-4 text-center">
          Thank you for your purchase!
        </h1>

        <p className="text-lg mb-8 text-center max-w-md">
          We have successfully processed your payment and your account has been
          created.
        </p>

        <h2 className="text-2xl font-bold mb-4">
          We appreciate your business.
        </h2>

        <div className="bg-gray-100 p-7 rounded-lg my-8">
          <p className="text-lg mb-4 max-w-md">
            Transactional ID:{" "}
            <span className="font-mono text-sm text-gray-500 wrap-break-word">
              {data.id}
            </span>
          </p>

          <p className="text-lg mb-4 max-w-md">
            User email:{" "}
            <span className="font-mono text-sm text-gray-500">
              {data.email || "No email provided"}
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
      </div>
    </div>
  );
};

export default SuccessPage;
