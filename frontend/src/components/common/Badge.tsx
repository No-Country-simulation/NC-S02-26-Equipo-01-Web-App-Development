type BadgeProps = {
  text: string;
  dataTestId?: string;
  icon?: React.ReactNode;
  color?: "gold" | "accent";
};

const Badge = ({ text, dataTestId = "badge", icon, color }: BadgeProps) => {
  return (
    <span
      data-testid={dataTestId}
      className={`inline-block bg-${color || "accent"} text-white text-xs text-center whitespace-nowrap font-semibold px-3 py-3 rounded-full`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;
