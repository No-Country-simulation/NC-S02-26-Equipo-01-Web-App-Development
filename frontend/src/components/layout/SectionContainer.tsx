import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Badge from "../common/Badge";

interface SectionProps {
  badge?: {
    text: string;
    icon?: React.ReactNode;
  };
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  isDark?: boolean;
}

const SectionContainer = ({
  badge,
  title,
  description,
  children,
  className = "",
  dataTestId = "section-container",
  isDark = false
}: SectionProps) => {
  return (
    <section data-testid={dataTestId}>
      <div
        className={twMerge(
          `max-w-7xl mx-auto px-4 py-20 ${isDark ? "bg-black text-white" : "bg-white text-black"} sm:px-6 lg:px-8 text-center`,
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
            className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-slate-900"} mb-6`}
          >
            {title}
          </h2>
          {description && (
            <p className={`text-md ${isDark ? "text-blue-100" : "text-slate-700"} max-w-2xl mx-auto`}>
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
