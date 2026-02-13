import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  dataTestId?: string;
  className?: string;
  isVariant?: "primary" | "secondary";
};

const Button = ({
  children,
  onClick,
  dataTestId = "button",
  className = "",
  isVariant = "secondary",
}: ButtonProps) => {
  return (
    <button
      data-testid={dataTestId}
      onClick={onClick}
      className={twMerge(
        `inline-block text-white cursor-pointer ${isVariant === "primary" ? "bg-primary hover:bg-primary-hover" : "bg-secondary hover:bg-secondary-hover"} my-2 mx-2 px-8 py-3 rounded-lg font-semibold transition-all shadow-md`,
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
