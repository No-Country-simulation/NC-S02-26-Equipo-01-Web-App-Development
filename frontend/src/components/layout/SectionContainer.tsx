import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Badge from "../common/Badge";

interface SectionProps {
  id?: string;
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  color?: "light" | "dark" | "blue";
}

const SectionContainer = ({
  id,
  badge,
  title,
  description,
  children,
  className = "",
  dataTestId = "section-container",
  color = "light",
}: SectionProps) => {
  const colorClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-black text-white",
    blue: "bg-light-blue-25 text-blue-900",
  };

  return (
    <section id={id} data-testid={dataTestId}>
      <div
        className={twMerge(
          `max-w-7xl mx-auto px-4 py-20 ${colorClasses[color]} sm:px-6 lg:px-8 text-center`,
          className,
        )}
      >
        <div className="text-center mb-16">
          {badge && (
            <div className="inline-block mb-4">
              <Badge
                text={badge.text}
                icon={badge.icon}
                dataTestId={`${dataTestId}-badge`}
              />
            </div>
          )}
          <h2
            data-testid={`${dataTestId}-title`}
            className={`text-4xl md:text-5xl font-bold ${color === "dark" ? "text-white" : "text-slate-900"} mb-6`}
          >
            {title}
          </h2>
          {description && (
            <p
              className={`text-md ${color === "dark" ? "text-blue-100" : "text-slate-700"} max-w-2xl mx-auto`}
            >
              {description}
            </p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
