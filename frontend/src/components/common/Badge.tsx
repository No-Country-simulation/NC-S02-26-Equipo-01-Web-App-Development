import type { ComponentType, SVGProps } from "react";

type BadgeProps = {
  text: string;
  dataTestId?: string;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  color?: "gold" | "accent";
};

const Badge = ({ text, dataTestId = "badge", Icon, color }: BadgeProps) => {
  return (
    <span
      data-testid={dataTestId}
      className={`inline-block ${color ? `bg-${color}` : "bg-accent"} text-white text-xs text-center whitespace-nowrap font-semibold px-3 py-3 rounded-full`}
    >
      <div className="flex items-center">
        {Icon && (
          <span className="mr-1 inline-flex items-center -m-1">
            <Icon className="w-6 h-6 fill-current text-white" />
          </span>
        )}
        {text}
      </div>
    </span>
  );
};

export default Badge;
