import { type ReactNode } from "react";

interface SectionProps {
  badge?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

const SectionContainer = ({
  badge,
  title,
  description,
  children,
  className = "",
}: SectionProps) => {
  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {badge && (
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                {badge}
              </span>
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
