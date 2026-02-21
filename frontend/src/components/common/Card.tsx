import type { ICard } from "@/types";
import { twMerge } from "tailwind-merge";
import Badge from "./Badge";

type CardProps = {
  data: ICard;
  children?: React.ReactNode;
  dataTestId?: string;
  className?: string;
  color?: "blue" | "light" | "transparent";
  isHorizontal?: boolean;
  titleSize?: "sm" | "base" | "lg" | "xl" | "2xl";
};

const Card = ({
  children,
  data,
  dataTestId = "card",
  className,
  color = "light",
  isHorizontal = false,
  titleSize = "lg",
}: CardProps) => {
  const colorClasses = {
    blue: "bg-light-blue text-black",
    light: "bg-white text-gray-900",
    transparent: "bg-transparent text-gray-100",
  };

  const titleSizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl",
    "2xl": "text-2xl md:text-3xl",
  };
  const IconComponent = data.icon;

  return (
    <div
      data-testid={dataTestId}
      className={twMerge(
        colorClasses[color || "light"],
        isHorizontal ? "flex-row max-w-lg" : "flex-col max-w-xs",
        "text-left flex items-center gap-4 rounded-2xl shadow-md p-7 min-w-xs",
        className,
      )}
    >
      {data.badged && (
        <span className="mb-4">
          <Badge text={data.badged.text} Icon={data.badged.icon} color={data.badged.color} />
        </span>
      )}
      {data.icon && (
        <span className="h-13 flex items-center justify-center mb-1 mx-auto">
          {IconComponent ? <IconComponent className={"w-full h-full fill-current " + (color === "transparent" ? "text-white" : "text-gray-900")} /> : null}
        </span>
      )}

      <div>
        <h3 className={twMerge("font-bold mb-2", titleSizeClasses[titleSize])}>
          {data.title}
        </h3>
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
