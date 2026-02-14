import type { ICard } from "@/types";
import { twMerge } from "tailwind-merge";

type CardProps = {
  data: ICard;
  children?: React.ReactNode;
  dataTestId?: string;
  className?: string;
  color?: "blue" | "light" | "transparent";
  isHorizontal?: boolean;
};

const Card = ({
  children,
  data,
  dataTestId = "card",
  className,
  color = "light",
  isHorizontal = false,
}: CardProps) => {
  const colorClasses = {
    blue: "bg-light-blue text-black",
    light: "bg-white text-gray-900",
    transparent: "bg-transparent text-gray-100",
  };
  return (
    <div
      data-testid={dataTestId}
      className={twMerge(
        colorClasses[color || "light"],
        isHorizontal
          ? "flex-row max-w-lg text-left"
          : "flex-col max-w-xs text-center",
        "flex items-center gap-4 rounded-2xl shadow-md p-5 min-w-xs",
        className,
      )}
    >
      <span className="w-8 h-8 flex items-center justify-center mb-4 mx-auto">
        <img src={data.icon} alt={data.title} className="w-5 h-5" />
      </span>
      <div>
        <h3 className="md:text-xl font-bold mb-4 text-lg">{data.title}</h3>
        <p
          className={
            color === "transparent" ? "text-gray-300" : "text-gray-900"
          }
        >
          {data.description}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Card;
