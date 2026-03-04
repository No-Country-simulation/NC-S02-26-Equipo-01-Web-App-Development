import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import type { MouseEventHandler } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<Element> | undefined;
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
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
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
    </motion.div>
  );
};

export default Button;
