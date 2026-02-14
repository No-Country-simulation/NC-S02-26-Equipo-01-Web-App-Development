import type { ICard } from "@/types";
import { twMerge } from "tailwind-merge";

type CardProps = {
  data: ICard;
  children?: React.ReactNode;
  dataTestId?: string;
  className?: string;
  color?: "blue" | "light" | "transparent";
};

const Card = ({
  children,
  data,
  dataTestId = "card",
  className,
  color = "light",
}: CardProps) => {
  const colorClasses = {
    blue: "bg-light-blue text-black",
    light: "bg-white text-gray-900",
    transparent: "bg-transparent text-gray-900",
  };
  return (
    <div
      data-testid={dataTestId}
      className={twMerge(
        colorClasses[color || "light"],
        "rounded-lg shadow-md p-5 min-w-xs max-w-xs flex flex-col items-center text-center",
        className,
      )}
    >
      <span className="w-8 h-8 flex items-center justify-center mb-4">
        <img src={data.icon} alt={data.title} className="w-5 h-5" />
      </span>
      <h3 className="md:text-xl font-bold mb-4 text-lg">{data.title}</h3>
      <p className="text-gray-900">{data.description}</p>
      {children}
    </div>
  );
};

export default Card;
